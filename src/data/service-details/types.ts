/**
 * Contenu détaillé des pages de service (une page = un service de src/data/services.ts).
 * Règle éditoriale : uniquement des faits vérifiables (produits édités par VIT GLOBAL,
 * délais et modes de facturation déjà publiés sur le site). Aucun chiffre, client ou
 * certification qui ne puisse être justifié.
 */
export interface ServiceDetail {
  /** Paragraphe « Pour qui ? » */
  forWhom: string;
  /** Cas concrets : [titre, explication] */
  useCases: [title: string, text: string][];
  /** Questions fréquentes propres au service : [question, réponse] */
  faq: [question: string, answer: string][];
}

export type ServiceDetails = Record<string, ServiceDetail>;
