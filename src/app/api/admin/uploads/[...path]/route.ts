import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { resolveUploadPath } from "@/lib/uploads";

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { path } = await params;

  try {
    const filePath = resolveUploadPath(path.join("/"));
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${path[path.length - 1]}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
