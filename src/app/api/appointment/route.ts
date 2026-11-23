import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/schemas";
import { notifyAdmin, sendWhatsApp } from "@/lib/notify";
import { syncAppointmentToCalendars } from "@/lib/calendar";
import { HOUR, limitByIp } from "@/lib/rate-limit";
import { todayInZone, zonedDateTimeToUtc } from "@/lib/timezone";

const MAX_DAYS_AHEAD = 180;

export async function POST(request: Request) {
  const limited = await limitByIp(request, "appointment", 5, HOUR);
  if (limited) return limited;

  const body = await request.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { date, ...rest } = parsed.data;

  // Les créneaux sont exprimés à l'heure de Casablanca, quel que soit le fuseau du serveur ou du visiteur.
  const start = zonedDateTimeToUtc(date, rest.timeSlot);
  if (Number.isNaN(start.getTime()) || date < todayInZone() || start.getTime() < Date.now()) {
    return NextResponse.json({ error: "date_in_past" }, { status: 400 });
  }
  if (start.getTime() > Date.now() + MAX_DAYS_AHEAD * 24 * HOUR) {
    return NextResponse.json({ error: "date_too_far" }, { status: 400 });
  }

  const dayStart = new Date(`${date}T00:00:00.000Z`);
  const taken = await prisma.appointment.count({
    where: { date: dayStart, timeSlot: rest.timeSlot, status: { not: "ARCHIVED" } }
  });
  if (taken > 0) {
    return NextResponse.json({ error: "slot_taken" }, { status: 409 });
  }

  const entry = await prisma.appointment.create({
    data: { ...rest, date: dayStart }
  });

  after(() => notifyAdmin(`Nouveau rendez-vous : ${entry.name} — ${entry.topic} le ${date} à ${entry.timeSlot} (heure de Casablanca)`));

  const clientPhone = entry.phone;
  if (clientPhone) {
    after(() =>
      sendWhatsApp(
        clientPhone,
        `Bonjour ${entry.name}, votre rendez-vous VIT GLOBAL (${entry.topic}) du ${date} à ${entry.timeSlot} (heure de Casablanca) est bien enregistré. À très vite !`
      )
    );
  }

  const end = new Date(start.getTime() + 45 * 60 * 1000);

  after(async () => {
    const results = await syncAppointmentToCalendars({
      summary: `VIT GLOBAL — ${entry.topic}`,
      description: `${entry.name} (${entry.email})${entry.notes ? `\n${entry.notes}` : ""}`,
      start,
      end,
      location: entry.mode ?? undefined,
      attendeeEmail: entry.email
    });
    const failed = results.filter((r) => !r.ok).map((r) => r.provider);
    if (failed.length > 0) {
      await notifyAdmin(`⚠ Le rendez-vous de ${entry.name} (${date} ${entry.timeSlot}) n'a pas pu être ajouté au calendrier : ${failed.join(", ")}. Vérifiez la connexion calendrier dans l'admin.`);
    }
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
