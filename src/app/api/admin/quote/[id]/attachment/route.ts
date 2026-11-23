import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { safeFilename } from "@/lib/security";

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

  const original = quote.attachmentName ?? "piece-jointe";
  return new NextResponse(Buffer.from(quote.attachmentData), {
    headers: {
      // Toujours en téléchargement, jamais interprété par le navigateur.
      "Content-Type": quote.attachmentMimeType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeFilename(original, "piece-jointe")}"; filename*=UTF-8''${encodeURIComponent(original)}`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Cache-Control": "private, no-store"
    }
  });
}
