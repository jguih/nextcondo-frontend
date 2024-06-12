/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/src/localization/dictionary";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () =>
    (await import("../../src/localization/dictionaries/en.json")).default,
  "pt-BR": async () =>
    (await import("../../src/localization/dictionaries/pt-BR.json")).default,
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
