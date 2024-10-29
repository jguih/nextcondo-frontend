import { i18n, Locale } from "@/i18n-config";

/**
 * Converts time and/or date to user's timezone.
 * @param time Time as `hh:mm:ss` in UTC.
 * @param date Date as `yyyy-mm-dd` in UTC.
 * @returns `String` as `hh:mm` in current user's timezone.
 */
export const getLocalTime = (
  time: string,
  date: string = new Date().toISOString().split("T")[0],
  locale: Locale = i18n.defaultLocale
): string => {
  const utcDate = new Date(`${date}T${time}Z`);
  const localTime = utcDate.toLocaleTimeString([locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localTime;
};

/**
 * Converts time and/or date to user's timezone.
 * @param time Time as `hh:mm:ss` in UTC.
 * @param date Date as `yyyy-mm-dd` in UTC.
 * @returns `String` containing date and time in user's timezone.
 */
export const getLocalDateTime = (
  time: string,
  date: string = new Date().toISOString().split("T")[0],
  locale: Locale = i18n.defaultLocale
): string => {
  const utcDate = new Date(`${date}T${time}Z`);
  const localDate = utcDate.toLocaleDateString();
  const localTime = utcDate.toLocaleTimeString([locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${localDate} ${localTime}`;
};

/**
 * Converts date to user's locale.
 * @param date Date as `yyyy-mm-dd`.
 * @returns `String` containing date in user's locale.
 */
export const getLocalDate = (
  date: string = new Date().toISOString().split("T")[0],
  locale: Locale = i18n.defaultLocale
): string => {
  const [year, month, day] = date.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));
  const formattedDate = new Intl.DateTimeFormat([locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(localDate);
  return formattedDate;
};
