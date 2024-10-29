import "server-only";
import { Dictionary } from "@/src/features/localization/types";
import { GetReservationsResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";

export const getStatus = (
  status: GetReservationsResponseDto[number]["status"],
  d: Dictionary
): string => {
  switch (status) {
    case "Completed": {
      return d.status.completed;
    }
    case "Confirmed": {
      return d.status.confirmed;
    }
    case "In Progress": {
      return d.status.in_progress;
    }
  }
};
