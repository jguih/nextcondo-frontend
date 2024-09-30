import { Locale } from "@/i18n-config";
import {
  GetOccurrenceResponseDto,
  GetOccurrenceTypesResponseDto,
} from "@/src/services/nextcondo/occurrences/schemas";

/**
 * Returns occurrence type name based on user locale.
 * @param type The occurrence type.
 * @param lang Current language for user.
 * @returns Name of occurrence type.
 */
export const getOccurrenceTypeName = (
  type:
    | GetOccurrenceResponseDto[number]["occurrenceType"]
    | GetOccurrenceTypesResponseDto[number],
  lang: Locale
): string => {
  switch (lang) {
    case "en":
      return type.name_EN;
    default:
      return type.name_PTBR;
  }
};
