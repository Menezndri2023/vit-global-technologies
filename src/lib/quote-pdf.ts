import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { QuoteRequest, Signature } from "@prisma/client";
import { parseProposal, type ProposalSnapshot } from "@/lib/quote-signature";

/**
 * Les polices standard PDF (Helvetica) n'encodent que le jeu WinAnsi : tout autre caractère
 * (arabe, emoji, retours à la ligne…) ferait échouer pdf-lib. On les remplace pour garantir la génération.
 * Limite connue : un texte en arabe apparaît sous forme de « ? » — nécessite l'intégration d'une police Unicode.
 */
const WIN_ANSI_EXTRA = new Set("€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ");
export function toWinAnsi(value: string) {
  let out = "";
  for (const char of value.replace(/\r\n?/g, "\n").replace(/\t/g, " ")) {
    const code = char.codePointAt(0) ?? 0;
    if (char === "\n" || (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || WIN_ANSI_EXTRA.has(char)) {
      out += char;
    } else {
      out += "?";
    }
  }
  return out;
}

class Writer {
  page: PDFPage;
  y = 800;
  readonly left = 50;
  readonly width = 495;

  constructor(private doc: PDFDocument, private font: PDFFont, private bold: PDFFont) {
    this.page = doc.addPage([595, 842]);
  }

  ensure(space: number) {
    if (this.y - space < 60) {
      this.page = this.doc.addPage([595, 842]);
      this.y = 800;
    }
  }

  text(value: string, opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; x?: number } = {}) {
    const size = opts.size ?? 10;
    this.ensure(size + 6);
    this.page.drawText(toWinAnsi(value), {
      x: opts.x ?? this.left,
      y: this.y,
      size,
      font: opts.bold ? this.bold : this.font,
      color: opts.color ?? rgb(0.04, 0.09, 0.19)
    });
  }

  /** Paragraphe avec retour à la ligne automatique et sauts de page. */
  paragraph(value: string, size = 10, indent = 0, color = rgb(0.04, 0.09, 0.19)) {
    const maxWidth = this.width - indent;
    for (const rawLine of toWinAnsi(value).split("\n")) {
      let line = "";
      const words = rawLine.split(" ");
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (this.font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
          this.text(line, { size, x: this.left + indent, color });
          this.y -= size + 6;
          line = word;
        } else {
          line = candidate;
        }
      }
      this.text(line, { size, x: this.left + indent, color });
      this.y -= size + 6;
    }
  }

  row(label: string, value: string) {
    this.ensure(24);
    this.text(label, { bold: true });
    this.page.drawText(toWinAnsi(value || "—"), {
      x: this.left + 150,
      y: this.y,
      size: 10,
      font: this.font,
      color: rgb(0.04, 0.09, 0.19),
      maxWidth: 345
    });
    this.y -= 22;
  }
}

export async function buildQuotePdf(quote: QuoteRequest, signature?: Signature | null) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const w = new Writer(pdfDoc, font, bold);

  const brand = rgb(0.11, 0.31, 0.85);
  const gray = rgb(0.42, 0.46, 0.53);
  const green = rgb(0.06, 0.45, 0.34);

  // Si le devis est signé, on reproduit exactement la proposition figée au moment de la signature.
  const proposal: ProposalSnapshot | null = signature
    ? parseProposal(signature.snapshot) ?? parseProposal(quote.proposal)
    : parseProposal(quote.proposal);

  w.text("VIT GLOBAL TECHNOLOGIES GROUP", { size: 16, bold: true, color: brand });
  w.y -= 20;
  w.text(
    signature ? "Devis accepté et signé électroniquement" : proposal ? "Proposition commerciale" : "Récapitulatif de demande de devis",
    { size: 12, color: gray }
  );
  w.y -= 36;

  w.row("Référence", quote.id);
  if (proposal) w.row("Version de la proposition", `v${proposal.version} — émise le ${new Date(proposal.issuedAt).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}`);
  w.row("Date de la demande", quote.createdAt.toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }));
  w.row("Client", proposal?.client.name ?? quote.name);
  w.row("Email", proposal?.client.email ?? quote.email);
  w.row("Téléphone", quote.phone ?? "");
  w.row("Entreprise", proposal?.client.company ?? quote.company ?? "");
  w.row("Pays", proposal?.client.country ?? quote.country ?? "");
  w.row("Service", proposal?.service ?? quote.service);
  if (!proposal) w.row("Budget indiqué", quote.budget ?? "À définir");
  w.row("Délai souhaité", proposal?.timeline ?? quote.timeline ?? "Flexible");
  if (!signature) w.row("Statut", quote.status);

  w.y -= 8;
  w.text("Description du projet", { size: 11, bold: true });
  w.y -= 18;
  w.paragraph(proposal?.description ?? quote.description);

  if (proposal && proposal.lines.length > 0) {
    w.y -= 10;
    w.text("Détail de la proposition", { size: 11, bold: true });
    w.y -= 20;
    for (const line of proposal.lines) {
      w.ensure(20);
      const amount = toWinAnsi(line.amount);
      w.text(line.title);
      w.page.drawText(amount, {
        x: w.left + w.width - font.widthOfTextAtSize(amount, 10),
        y: w.y,
        size: 10,
        font: bold,
        color: rgb(0.04, 0.09, 0.19)
      });
      w.y -= 18;
    }
  }

  if (signature) {
    w.y -= 16;
    w.ensure(150);
    w.text("Signature électronique simple", { size: 11, bold: true, color: green });
    w.y -= 18;
    w.paragraph(`Signé par : ${signature.signerName} (${signature.signerEmail})`, 9);
    w.paragraph(`Le : ${signature.signedAt.toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })} (heure de Casablanca) — ${signature.signedAt.toISOString()}`, 9);
    if (signature.ipAddress) w.paragraph(`Adresse IP : ${signature.ipAddress}`, 9, 0, gray);
    if (signature.consentText) w.paragraph(`Consentement exprimé : « ${signature.consentText} »`, 9, 0, gray);
    if (signature.documentHash) w.paragraph(`Empreinte SHA-256 de la proposition signée : ${signature.documentHash}`, 8, 0, gray);
  }

  for (const page of pdfDoc.getPages()) {
    page.drawText("Document généré automatiquement — VIT GLOBAL TECHNOLOGIES GROUP", { x: 50, y: 40, size: 8, font, color: gray });
  }

  return pdfDoc.save();
}
