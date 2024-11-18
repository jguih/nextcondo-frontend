import { FC } from "react";
import { ClientReservationsList } from "./client";
import { Dictionary } from "@/src/features/localization/types";

export const ReservationsList: FC<{ d: Dictionary }> = async ({ d }) => {
  return (
    <ClientReservationsList
      text={{
        timeFromTo: d.page.commonAreas.time_from_to,
        statusCompleted: d.status.completed,
        statusConfirmed: d.status.confirmed,
        statusInProgress: d.status.in_progress,
      }}
    />
  );
};
