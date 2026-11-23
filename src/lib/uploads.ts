// Les fonctions Vercel refusent les corps de requête au-delà de 4,5 Mo : la limite applicative est donc fixée à 4 Mo.
export const MAX_FILE_SIZE = 4 * 1024 * 1024;

type Signature = number[];
const PDF: Signature = [0x25, 0x50, 0x44, 0x46]; // %PDF
const PNG: Signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG: Signature = [0xff, 0xd8, 0xff];
const ZIP: Signature = [0x50, 0x4b, 0x03, 0x04]; // ZIP, et donc aussi .docx / .xlsx
const OLE: Signature = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]; // anciens .doc / .xls

const TYPES: Record<string, { mime: string; magic: Signature }> = {
  ".pdf": { mime: "application/pdf", magic: PDF },
  ".doc": { mime: "application/msword", magic: OLE },
  ".docx": { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: ZIP },
  ".xls": { mime: "application/vnd.ms-excel", magic: OLE },
  ".xlsx": { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", magic: ZIP },
  ".png": { mime: "image/png", magic: PNG },
  ".jpg": { mime: "image/jpeg", magic: JPEG },
  ".jpeg": { mime: "image/jpeg", magic: JPEG },
  ".zip": { mime: "application/zip", magic: ZIP }
};

export const ALLOWED_EXTENSIONS = Object.keys(TYPES);

function startsWith(data: Uint8Array, magic: Signature) {
  return data.length >= magic.length && magic.every((byte, index) => data[index] === byte);
}

/**
 * Valide un fichier joint : taille, extension ET contenu réel (signature binaire « magic bytes »).
 * Le type MIME enregistré est déduit du contenu vérifié, jamais de la déclaration du navigateur.
 */
export function validateUpload(name: string, data: Uint8Array) {
  if (data.length > MAX_FILE_SIZE) throw new Error("FILE_TOO_LARGE");
  const ext = `.${name.split(".").pop()?.toLowerCase() ?? ""}`;
  const type = TYPES[ext];
  if (!type) throw new Error("FILE_TYPE_NOT_ALLOWED");
  if (!startsWith(data, type.magic)) throw new Error("FILE_CONTENT_MISMATCH");
  return { mimeType: type.mime, extension: ext };
}

export async function readUploadedFile(file: File) {
  if (file.size > MAX_FILE_SIZE) throw new Error("FILE_TOO_LARGE");
  const data = new Uint8Array(await file.arrayBuffer());
  const { mimeType } = validateUpload(file.name, data);
  return {
    data,
    originalName: file.name.slice(0, 200),
    mimeType
  };
}
