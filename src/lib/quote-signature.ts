import type { Prisma, QuoteRequest } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { canonicalJson, generateToken, hashToken, sha256Hex } from "@/lib/security";
import { customPricingSchema, type CustomPricingLine } from "@/lib/schemas";
import { SITE_URL } from "@/lib/seo";

export const SIGN_LINK_TTL_MS = 14 * 24 * 60 * 60 * 1000;

/** Contenu figé d'une proposition : c'est exactement ce que le client voit et signe. */
export interface ProposalSnapshot {
  reference: string;
  version: number;
  issuedAt: string;
  issuer: string;
  client: { name: string; email: string; company: string | null; country: string | null };
  service: string;
  description: string;
  timeline: string | null;
  lines: CustomPricingLine[];
}

export function buildProposalSnapshot(quote: QuoteRequest, version: number, lines: CustomPricingLine[]): ProposalSnapshot {
  return {
    reference: quote.id,
    version,
    issuedAt: new Date().toISOString(),
    issuer: "VIT GLOBAL TECHNOLOGIES GROUP SARLU",
    client: { name: quote.name, email: quote.email, company: quote.company, country: quote.country },
    service: quote.service,
    description: quote.description,
    timeline: quote.timeline,
    lines
  };
}

export function parseProposal(value: Prisma.JsonValue | null | undefined): ProposalSnapshot | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as unknown as ProposalSnapshot;
  if (typeof candidate.reference !== "string" || typeof candidate.version !== "number") return null;
  const lines = customPricingSchema.safeParse(candidate.lines);
  return lines.success ? { ...candidate, lines: lines.data } : null;
}

/** Empreinte SHA-256 de la proposition et du consentement signés (preuve d'intégrité). */
export function computeDocumentHash(snapshot: ProposalSnapshot, consentText: string) {
  return sha256Hex(canonicalJson({ proposal: snapshot, consent: consentText }));
}

/** Émet un lien de signature à usage unique pour la version courante de la proposition. */
export async function issueSignLink(quoteId: string, proposalVersion: number, locale: string) {
  const token = generateToken();
  await prisma.quoteSignToken.create({
    data: {
      quoteId,
      tokenHash: hashToken(token),
      proposalVersion,
      expiresAt: new Date(Date.now() + SIGN_LINK_TTL_MS)
    }
  });
  const loc = ["fr", "en", "ar"].includes(locale) ? locale : "fr";
  return { token, url: `${SITE_URL}/${loc}/devis/signature/${token}` };
}

export type SignLinkState =
  | { status: "invalid" }
  | { status: "expired" }
  | { status: "superseded" }
  | {
      status: "ready" | "signed";
      tokenId: string;
      quote: Prisma.QuoteRequestGetPayload<{ include: { signature: true } }>;
      proposal: ProposalSnapshot;
    };

/**
 * Résout un jeton de signature. Un jeton :
 *  - expire après 14 jours ;
 *  - n'est valable que pour la version de proposition pour laquelle il a été émis ;
 *  - reste utilisable après signature uniquement pour consulter/télécharger le document signé.
 */
export async function resolveSignToken(token: string | null | undefined): Promise<SignLinkState> {
  if (!token || token.length < 20 || token.length > 200) return { status: "invalid" };
  const record = await prisma.quoteSignToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { quote: { include: { signature: true } } }
  });
  if (!record) return { status: "invalid" };
  if (record.expiresAt.getTime() < Date.now()) return { status: "expired" };

  const { quote } = record;
  if (quote.signature) {
    const signedProposal = parseProposal(quote.signature.snapshot) ?? parseProposal(quote.proposal);
    if (!signedProposal) return { status: "invalid" };
    return { status: "signed", tokenId: record.id, quote, proposal: signedProposal };
  }

  if (record.usedAt || record.proposalVersion !== quote.proposalVersion) return { status: "superseded" };
  const proposal = parseProposal(quote.proposal);
  if (!proposal || proposal.version !== record.proposalVersion) return { status: "superseded" };

  return { status: "ready", tokenId: record.id, quote, proposal };
}

export function emailsMatch(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
