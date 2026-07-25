import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { QuoteRequest, Signature } from "@prisma/client";

export async function buildQuotePdf(quote: QuoteRequest, signature?: Signature | null) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const brand = rgb(0.11, 0.31, 0.85);
  const dark = rgb(0.04, 0.09, 0.19);
  const gray = rgb(0.42, 0.46, 0.53);
  const green = rgb(0.06, 0.45, 0.34);

  let y = 800;
  const left = 50;

  page.drawText("VIT GLOBAL TECHNOLOGIES GROUP", { x: left, y, size: 16, font: bold, color: brand });
  y -= 20;
  page.drawText(
    signature ? "Devis accepté et signé électroniquement" : "Récapitulatif de demande de devis",
    { x: left, y, size: 12, font, color: gray }
  );
  y -= 40;

  const row = (label: string, value: string) => {
    page.drawText(label, { x: left, y, size: 10, font: bold, color: dark });
    page.drawText(value || "—", { x: left + 150, y, size: 10, font, color: dark, maxWidth: 380 });
    y -= 24;
  };

  row("Référence", quote.id);
  row("Date", quote.createdAt.toLocaleString("fr-FR"));
  row("Nom", quote.name);
  row("Email", quote.email);
  row("Téléphone", quote.phone ?? "");
  row("Entreprise", quote.company ?? "");
  row("Pays", quote.country ?? "");
  row("Service", quote.service);
  row("Budget", quote.budget ?? "À définir");
  row("Délai souhaité", quote.timeline ?? "Flexible");
  row("Statut", quote.status);

  y -= 10;
  page.drawText("Description du projet", { x: left, y, size: 11, font: bold, color: dark });
  y -= 18;

  const words = quote.description.split(" ");
  let line = "";
  const maxWidth = 495;
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, 10) > maxWidth) {
      page.drawText(line, { x: left, y, size: 10, font, color: dark });
      y -= 16;
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line, { x: left, y, size: 10, font, color: dark });
    y -= 16;
  }

  if (signature) {
    y -= 20;
    page.drawRectangle({ x: left, y: y - 70, width: 495, height: 90, borderColor: green, borderWidth: 1 });
    y -= 15;
    page.drawText("Signature électronique", { x: left + 12, y, size: 11, font: bold, color: green });
    y -= 18;
    page.drawText(`Signé par : ${signature.signerName} (${signature.signerEmail})`, {
      x: left + 12,
      y,
      size: 9,
      font,
      color: dark
    });
    y -= 15;
    page.drawText(`Le : ${signature.signedAt.toLocaleString("fr-FR")}`, { x: left + 12, y, size: 9, font, color: dark });
    y -= 15;
    if (signature.ipAddress) {
      page.drawText(`Adresse IP : ${signature.ipAddress}`, { x: left + 12, y, size: 9, font, color: gray });
    }
  }

  page.drawText("Document généré automatiquement — VIT GLOBAL TECHNOLOGIES GROUP", {
    x: left,
    y: 40,
    size: 8,
    font,
    color: gray
  });

  return pdfDoc.save();
}
