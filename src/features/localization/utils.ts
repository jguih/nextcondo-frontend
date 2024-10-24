import { Locale } from "@/i18n-config";

/**
 * Replaces variables on a string using keys and values from the props object.
 * @param entry `String` that contains variables to be replaced.
 * @param props Object with keys that matches entry's variable names and their respective values.
 * @returns `String` with it's variables replaced.
 * @example
 * const text = "I have {{ count }} oranges.";
 * const formatted = format(text, { count: 13 });
 * console.log(formatted) // I have 13 oranges.
 */
export const format = (
  entry: string,
  props: Record<string, string | number>
): string => {
  let newEntry = entry;
  for (const prop in props) {
    newEntry = newEntry.replace(
      new RegExp("{{ " + prop + " }}", "g"),
      String(props[prop])
    );
  }
  return newEntry;
};

export const getLocalizedAttribute = (
  object: Record<string, string | number>,
  prop: string,
  lang: Locale
): string => {
  let text = "";
  // ["pt", "br"] -> "ptbr"
  const normalizedLang = lang.split("-").join("").toLowerCase();
  Object.entries(object).forEach((item) => {
    const [key, value] = item;
    if (key.includes(prop) && key.toLowerCase().includes(normalizedLang)) {
      text = String(value);
    }
  });
  return text;
};
