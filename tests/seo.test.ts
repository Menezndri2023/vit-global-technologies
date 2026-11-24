import { describe, expect, it } from "vitest";
import { buildMetadata, fitDescription, TITLE_SUFFIX } from "@/lib/seo";
import { breadcrumb, faqPage, ORGANIZATION_ID, siteGraph } from "@/lib/structured-data";
import { faqItems } from "@/data/faq";

describe("titres de page", () => {
  it("ajoute le suffixe de marque seulement si le titre reste sous 65 caractères", () => {
    expect(buildMetadata({ locale: "fr", title: "Contact", description: "d" }).title).toBe("Contact");
    const long = "Un titre d'article de blog très long qui dépasse déjà la limite à lui seul";
    expect(buildMetadata({ locale: "fr", title: long, description: "d" }).title).toEqual({ absolute: long });
    expect(`Réalisations : VIT AUTO, KORVA OS, MARGOKIT${TITLE_SUFFIX}`.length).toBeLessThanOrEqual(65);
  });
});

describe("descriptions", () => {
  it("reste entre 25 et 160 caractères, coupée en fin de phrase ou de mot", () => {
    const court = "Une description courte et complète.";
    expect(fitDescription(court)).toBe(court);
    const phrases = `${"Première phrase assez longue pour dépasser quatre-vingts caractères au total. ".repeat(2)}Suite.`;
    expect(fitDescription(phrases).endsWith(".")).toBe(true);
    expect(fitDescription(phrases).length).toBeLessThanOrEqual(160);
    const mots = "mot ".repeat(80);
    expect(fitDescription(mots)).toMatch(/mot…$/);
    expect(fitDescription(mots).length).toBeLessThanOrEqual(160);
  });
});

describe("données structurées", () => {
  it("décrit l'entreprise et le site avec un identifiant stable", () => {
    const graph = siteGraph("fr")["@graph"];
    expect(graph.map((node) => node["@type"])).toEqual(["Organization", "WebSite"]);
    expect(graph[0]["@id"]).toBe(ORGANIZATION_ID);
  });

  it("génère la FAQ et le fil d'Ariane depuis les données du site", () => {
    expect(faqPage(faqItems, "fr").mainEntity).toHaveLength(faqItems.length);
    const items = breadcrumb("en", [["Blog", "/blog"]]).itemListElement;
    expect(items.map((i) => [i.position, i.name])).toEqual([[1, "Home"], [2, "Blog"]]);
    expect(items[1].item).toMatch(/\/en\/blog$/);
  });

  it("ne publie plus d'effectifs non vérifiables dans la FAQ", () => {
    expect(JSON.stringify(faqItems)).not.toMatch(/120 (collaborateurs|employees)/);
  });
});

describe("pages de service", () => {
  it("ont un contenu détaillé complet dans les trois langues", async () => {
    const { services } = await import("@/data/services");
    const { serviceDetails } = await import("@/data/service-details");
    for (const locale of ["fr", "en", "ar"] as const) {
      expect(Object.keys(serviceDetails[locale]).sort()).toEqual(services.map((s) => s.slug).sort());
      for (const detail of Object.values(serviceDetails[locale])) {
        expect(detail.forWhom.length).toBeGreaterThan(80);
        expect(detail.useCases).toHaveLength(3);
        expect(detail.faq).toHaveLength(3);
      }
    }
  });
});
