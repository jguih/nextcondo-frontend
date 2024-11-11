import { FC } from "react";
import { GetReservationsResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { Typography } from "@/src/components/typography/typography";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { Chip } from "@/src/components/chip/chip";
import styles from "./styles.module.scss";
import { getStatus } from "../get-status";
import { convertDateToUserLocale } from "@/src/lib/utils/timezone-utils";

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
      <Typography>{convertDateToUserLocale(reservation.date, lang)}</Typography>
      <Typography>
        {format(d.page.commonAreas.time_from_to, {
          time1: reservation.startAt.slice(0, 5),
          time2: reservation.endAt.slice(0, 5),
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
