import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({
    where: { id },
    select: { attachmentData: true, attachmentName: true, attachmentMimeType: true }
  });

  if (!quote?.attachmentData) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return new NextResponse(Buffer.from(quote.attachmentData), {
    headers: {
      "Content-Type": quote.attachmentMimeType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${quote.attachmentName ?? "piece-jointe"}"`
    }
  });
}
