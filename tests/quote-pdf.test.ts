import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import type { QuoteRequest, Signature } from "@prisma/client";
import { buildQuotePdf } from "@/lib/quote-pdf";
import { buildProposalSnapshot, computeDocumentHash } from "@/lib/quote-signature";
import { companyLegalLine } from "@/data/legal";

const quote = {
  id: "cq_test",
  name: "محمد Ä Test",
  email: "client@example.com",
  phone: "+212600000000",
  company: "Société Test",
  country: "Maroc",
  service: "Développement web",
  budget: null,
  timeline: "1 à 3 mois",
  description: "Ligne 1\nLigne 2 avec émoji 🚀\n" + "mot ".repeat(900),
  attachmentData: null,
  attachmentName: null,
  attachmentMimeType: null,
  customPricing: null,
  proposal: null,
  proposalVersion: 1,
  proposalSentAt: new Date("2026-11-20T10:00:00Z"),
  locale: "fr",
  status: "NEW",
  createdAt: new Date("2026-11-19T10:00:00Z")
} as unknown as QuoteRequest;

describe("PDF de devis signé", () => {
  it("se génère même avec arabe, émoji, retours à la ligne et texte long, avec la mention légale", async () => {
    const snapshot = buildProposalSnapshot(quote, 1, [
      { title: "Site vitrine", amount: "4 500 MAD" },
      { title: "Maintenance 12 mois", amount: "1 200 MAD" }
    ]);
    const signature = {
      id: "sig",
      quoteId: quote.id,
      signerName: "محمد Test",
      signerEmail: "client@example.com",
      ipAddress: "1.2.3.4",
      userAgent: "test",
      signedAt: new Date("2026-11-21T10:00:00Z"),
      proposalVersion: 1,
      snapshot,
      documentHash: computeDocumentHash(snapshot, "J'accepte"),
      consentText: "J'accepte",
      locale: "fr"
    } as unknown as Signature;

    const bytes = await buildQuotePdf(quote, signature);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBeGreaterThan(1);
    expect(companyLegalLine()).toContain("ICE 004013219000041");
    expect(companyLegalLine()).toContain("RC Casablanca 742851");
  });

  it("l'empreinte change si la proposition est modifiée", () => {
    const a = buildProposalSnapshot(quote, 1, [{ title: "A", amount: "100 MAD" }]);
    const b = { ...a, lines: [{ title: "A", amount: "1000 MAD" }] };
    expect(computeDocumentHash(a, "ok")).not.toBe(computeDocumentHash(b, "ok"));
  });
});
