export type Locale = "fr" | "en" | "ar";

export type Localized<T> = Record<Locale, T>;
