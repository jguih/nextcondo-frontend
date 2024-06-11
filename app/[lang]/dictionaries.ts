/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/i18n-config";

const dictionaries: Record<Locale, () => any> = {
  en: async () =>
    (await import("../../src/localization/dictionaries/en.json")).default,
  "pt-BR": async () =>
    (await import("../../src/localization/dictionaries/pt-BR.json")).default,
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
