import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteSchema } from "@/lib/schemas";
import { saveUploadedFile } from "@/lib/uploads";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fields = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
  ) as Record<string, string>;

  const file = formData.get("attachment");
  let attachmentPath: string | undefined;
  let attachmentName: string | undefined;

  if (file instanceof File && file.size > 0) {
    try {
      const saved = await saveUploadedFile(file, "quotes");
      attachmentPath = saved.relativePath;
      attachmentName = saved.originalName;
    } catch (error) {
      const code = error instanceof Error ? error.message : "UPLOAD_FAILED";
      return NextResponse.json({ error: code }, { status: 400 });
    }
  }

  const parsed = quoteSchema.safeParse({ ...fields, attachmentPath, attachmentName });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.quoteRequest.create({ data: parsed.data });
  return NextResponse.json({ id: entry.id }, { status: 201 });
}
