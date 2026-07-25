import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/schemas";
import { notifyAdmin, sendWhatsApp } from "@/lib/notify";
import { syncAppointmentToCalendars } from "@/lib/calendar";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { date, ...rest } = parsed.data;
  const entry = await prisma.appointment.create({
    data: { ...rest, date: new Date(date) }
  });

  notifyAdmin(`Nouveau rendez-vous : ${entry.name} — ${entry.topic} le ${date} à ${entry.timeSlot}`);

  if (entry.phone) {
    sendWhatsApp(
      entry.phone,
      `Bonjour ${entry.name}, votre rendez-vous VIT GLOBAL (${entry.topic}) du ${date} à ${entry.timeSlot} est bien enregistré. À très vite !`
    );
  }

  const [hour, minute] = entry.timeSlot.split(":").map(Number);
  const start = new Date(entry.date);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  syncAppointmentToCalendars({
    summary: `VIT GLOBAL — ${entry.topic}`,
    description: `${entry.name} (${entry.email})${entry.notes ? `\n${entry.notes}` : ""}`,
    start,
    end,
    location: entry.mode ?? undefined,
    attendeeEmail: entry.email
  });

  return NextResponse.json({ id: entry.id }, { status: 201 });
}
