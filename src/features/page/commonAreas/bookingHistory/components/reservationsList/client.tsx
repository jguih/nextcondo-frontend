"use client";

import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { useCommonAreaReservations } from "@/src/services/nextcondo/commonAreas/useCase/use-reservations";
import { FC } from "react";
import { Typography } from "@/src/components/typography/typography";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { convertDateToUserLocale } from "@/src/lib/utils/timezone/timezone-utils";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import styles from "./styles.module.scss";
import { Chip } from "@/src/components/chip/chip";

export const ClientReservationsList: FC<{
  text: {
    timeFromTo: string;
    statusCompleted: string;
    statusConfirmed: string;
    statusInProgress: string;
  };
}> = ({ text }) => {
  const { data, isLoading, error } = useCommonAreaReservations();
  const lang = useLocale();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  const reservations =
    data && data.success && data.hasData ? data.response.data : [];

  return (
    <List>
      {reservations.map((reservation) => {
        const status =
          reservation.status === "Completed"
            ? text.statusCompleted
            : reservation.status === "Confirmed"
              ? text.statusConfirmed
              : reservation.status === "In Progress"
                ? text.statusInProgress
                : "";
        return (
          <ListItem key={reservation.id}>
            <div className={styles["reservation-item"]}>
              <Typography tag="h4" className={styles.title}>
                {getLocalizedAttribute(reservation.commonArea, "name", lang)}
              </Typography>
              <Typography color="accent">
                {getLocalizedAttribute(reservation.slot, "name", lang)}
              </Typography>
              <Typography>
                {convertDateToUserLocale(reservation.date, lang)}
              </Typography>
              <Typography>
                {format(text.timeFromTo, {
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
                {status}
              </Chip>
            </div>
            <hr />
          </ListItem>
        );
      })}
    </List>
  );
};
