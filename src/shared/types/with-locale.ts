import { Locale } from "@/i18n-config";

export type WithLocale<T extends object = object> = T & {
  params: { lang: Locale };
};
