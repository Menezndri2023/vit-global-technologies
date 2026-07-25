import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteSchema } from "@/lib/schemas";
import { readUploadedFile } from "@/lib/uploads";
import { notifyAdmin } from "@/lib/notify";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fields = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
  ) as Record<string, string>;

  const file = formData.get("attachment");
  let attachmentData: Uint8Array | undefined;
  let attachmentName: string | undefined;
  let attachmentMimeType: string | undefined;

  if (file instanceof File && file.size > 0) {
    try {
      const saved = await readUploadedFile(file);
      attachmentData = saved.data;
      attachmentName = saved.originalName;
      attachmentMimeType = saved.mimeType;
    } catch (error) {
      const code = error instanceof Error ? error.message : "UPLOAD_FAILED";
      return NextResponse.json({ error: code }, { status: 400 });
    }
  }

  const parsed = quoteSchema.safeParse(fields);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.quoteRequest.create({
    data: {
      ...parsed.data,
      attachmentData: attachmentData ? Buffer.from(attachmentData) : undefined,
      attachmentName,
      attachmentMimeType
    }
  });
  notifyAdmin(`Nouvelle demande de devis de ${entry.name} — ${entry.service}`);
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
