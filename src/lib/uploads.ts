import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOADS_ROOT = path.join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg", ".zip"];

export async function saveUploadedFile(file: File, subdir: string) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("FILE_TOO_LARGE");
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error("FILE_TYPE_NOT_ALLOWED");
  }

  const dir = path.join(UPLOADS_ROOT, subdir);
  await mkdir(dir, { recursive: true });

  const safeName = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, safeName), buffer);

  return { relativePath: `${subdir}/${safeName}`, originalName: file.name };
}

export function resolveUploadPath(relativePath: string) {
  const resolved = path.normalize(path.join(UPLOADS_ROOT, relativePath));
  if (!resolved.startsWith(UPLOADS_ROOT)) {
    throw new Error("INVALID_PATH");
  }
  return resolved;
}
