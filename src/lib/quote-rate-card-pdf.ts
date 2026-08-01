import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { detailedRateCard, forfaitPaymentSplit } from "@/data/pricing";
import type { Locale } from "@/data/types";
import type { CustomPricingLine } from "@/lib/schemas";

const COPY: Record<
  Locale,
  { heading: string; subheading: string; customSubheading: string; rateTitle: string; paymentTitle: string; disclaimer: string; footer: string }
> = {
  fr: {
    heading: "VIT GLOBAL TECHNOLOGIES GROUP",
    subheading: "Grille tarifaire détaillée — document confidentiel",
    customSubheading: "Grille tarifaire personnalisée — document confidentiel",
    rateTitle: "Tarifs",
    paymentTitle: "Conditions de paiement au forfait",
    disclaimer: "Tarifs indicatifs, hors taxes, susceptibles d'ajustement selon le périmètre exact de votre projet. Ce document vous est adressé à titre personnel suite à votre demande de devis.",
    footer: "Document généré automatiquement — VIT GLOBAL TECHNOLOGIES GROUP"
  },
  en: {
    heading: "VIT GLOBAL TECHNOLOGIES GROUP",
    subheading: "Detailed rate card — confidential document",
    customSubheading: "Custom rate card — confidential document",
    rateTitle: "Rates",
    paymentTitle: "Fixed-price payment terms",
    disclaimer: "Indicative rates, excluding tax, subject to adjustment based on your project's exact scope. This document is sent to you personally following your quote request.",
    footer: "Automatically generated document — VIT GLOBAL TECHNOLOGIES GROUP"
  },
  ar: {
    heading: "VIT GLOBAL TECHNOLOGIES GROUP",
    subheading: "الشبكة التسعيرية التفصيلية — وثيقة سرية",
    customSubheading: "شبكة تسعيرية مخصصة — وثيقة سرية",
    rateTitle: "الأسعار",
    paymentTitle: "شروط الدفع بسعر إجمالي",
    disclaimer: "أسعار إرشادية، غير شاملة للضريبة، قابلة للتعديل حسب النطاق الدقيق لمشروعكم. تُرسل إليكم هذه الوثيقة بشكل شخصي بعد طلب عرض السعر.",
    footer: "وثيقة تم إنشاؤها تلقائيًا — VIT GLOBAL TECHNOLOGIES GROUP"
  }
};

export async function buildRateCardPdf(locale: Locale = "fr", customLines?: CustomPricingLine[]) {
  const copy = COPY[locale] ?? COPY.fr;
  const isCustom = Boolean(customLines && customLines.length > 0);
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const brand = rgb(0.11, 0.31, 0.85);
  const dark = rgb(0.04, 0.09, 0.19);
  const gray = rgb(0.42, 0.46, 0.53);

  const left = 50;
  const top = 800;
  const bottom = 70;

  let page: PDFPage = pdfDoc.addPage([595, 842]);
  let y = top;

  function ensureSpace(needed: number) {
    if (y - needed < bottom) {
      page = pdfDoc.addPage([595, 842]);
      y = top;
    }
  }

  function drawRow(label: string, value: string, labelFont: PDFFont = font, valueColor = dark) {
    ensureSpace(22);
    page.drawText(label, { x: left, y, size: 10, font: labelFont, color: dark, maxWidth: 320 });
    page.drawText(value, { x: left + 330, y, size: 10, font: bold, color: valueColor, maxWidth: 200 });
    y -= 22;
  }

  page.drawText(copy.heading, { x: left, y, size: 16, font: bold, color: brand });
  y -= 20;
  page.drawText(isCustom ? copy.customSubheading : copy.subheading, { x: left, y, size: 11, font, color: gray });
  y -= 40;

  page.drawText(copy.rateTitle, { x: left, y, size: 13, font: bold, color: dark });
  y -= 24;

  if (isCustom) {
    for (const line of customLines!) {
      drawRow(line.title, line.amount, font, brand);
    }
  } else {
    for (const entry of detailedRateCard) {
      drawRow(entry.title[locale] ?? entry.title.fr, entry.range[locale] ?? entry.range.fr, font, brand);
    }
  }

  y -= 20;
  ensureSpace(24);
  page.drawText(copy.paymentTitle, { x: left, y, size: 13, font: bold, color: dark });
  y -= 24;

  for (const split of forfaitPaymentSplit) {
    ensureSpace(20);
    const label = split.label[locale] ?? split.label.fr;
    page.drawText(`${split.percentage}%`, { x: left, y, size: 10, font: bold, color: brand });
    page.drawText(label, { x: left + 50, y, size: 10, font, color: dark, maxWidth: 480 });
    y -= 20;
  }

  y -= 20;
  const words = copy.disclaimer.split(" ");
  let line = "";
  const maxWidth = 495;
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, 9) > maxWidth) {
      ensureSpace(14);
      page.drawText(line, { x: left, y, size: 9, font, color: gray });
      y -= 14;
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ensureSpace(14);
    page.drawText(line, { x: left, y, size: 9, font, color: gray });
  }

  page.drawText(copy.footer, { x: left, y: 40, size: 8, font, color: gray });

  return pdfDoc.save();
}
