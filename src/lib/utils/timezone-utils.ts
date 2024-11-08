import { Locale } from "@/i18n-config";

export const getUserTimezoneOffsetMinutes = () => {
  /**
   * Js will return negative for positive offsets and vice versa.
   * Back-end requires the signal to be inverted.
   */
  const timezoneOffsetMinutes = -new Date().getTimezoneOffset();
  return timezoneOffsetMinutes;
};

/**
 * Converts time and date to user's timezone.
 * @param time Time as `hh:mm:ss` in UTC.
 * @param locale User's locale.
 * @param date Date as `yyyy-mm-dd` in UTC.
 * @default new Date().toISOString().split("T")[0]
 * @returns `String` as `hh:mm` in current user's timezone.
 */
export const convertTimeFromUTCToUserTimezone = (
  time: string,
  locale: Locale,
  date: string = new Date().toISOString().split("T")[0]
): string => {
  const utcDate = new Date(`${date}T${time}Z`);
  const localTime = utcDate.toLocaleTimeString([locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localTime;
};

/**
 * Converts date to user's locale.
 * @param date Date as `yyyy-mm-dd`.
 * @default new Date().toISOString().split("T")[0]
 * @param locale User's locale.
 * @returns `String` containing date in user's locale.
 */
export const convertDateToUserLocale = (
  date: string = new Date().toISOString().split("T")[0],
  locale: Locale
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
