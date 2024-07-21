import { Locale } from "@/i18n-config";
import { Dictionary } from "@/src/localization/dictionary";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => (await import("./dictionaries/en.json")).default,
  "pt-BR": async () => (await import("./dictionaries/pt-BR.json")).default,
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
