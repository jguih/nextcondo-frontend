import { FC } from "react";
import { GetReservationsResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { Typography } from "@/src/components/typography/typography";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { getLocalDate, getLocalTime } from "../../../get-local-time";
import { Chip } from "@/src/components/chip/chip";
import styles from "./styles.module.scss";
import { getStatus } from "../get-status";

export const ReservationItem: FC<{
  reservation: GetReservationsResponseDto[number];
  lang: Locale;
}> = async ({ reservation, lang }) => {
  const d = await getDictionary(lang);
  return (
    <div className={styles["reservation-item"]}>
      <Typography tag="h4" className={styles.title}>
        {getLocalizedAttribute(reservation.commonArea, "name", lang)}
      </Typography>
      <Typography color="accent">
        {getLocalizedAttribute(reservation.slot, "name", lang)}
      </Typography>
      <Typography>{getLocalDate(reservation.date, lang)}</Typography>
      <Typography>
        {format(d.page.commonAreas.time_from_to, {
          time1: getLocalTime(reservation.startAt, reservation.date, lang),
          time2: getLocalTime(reservation.endAt, reservation.date, lang),
        })}
      </Typography>
      <Chip
        color={
          reservation.status === "Completed"
            ? "success"
            : reservation.status === "Confirmed"
              ? "primary"
              : reservation.status === "In Progress"
                ? "accent"
                : "neutral"
        }
        className={styles.status}
      >
        {getStatus(reservation.status, d)}
      </Chip>
    </div>
  );
};
