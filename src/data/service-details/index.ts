import type { Locale } from "../types";
import type { ServiceDetail, ServiceDetails } from "./types";
import { fr } from "./fr";
import { en } from "./en";
import { ar } from "./ar";

export type { ServiceDetail } from "./types";

export const serviceDetails: Record<Locale, ServiceDetails> = { fr, en, ar };

export function getServiceDetail(slug: string, locale: Locale): ServiceDetail | undefined {
  return serviceDetails[locale]?.[slug];
}
