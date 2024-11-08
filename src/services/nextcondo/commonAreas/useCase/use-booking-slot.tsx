"use client";

import { useServices } from "@/src/services/components/provider";
import useSWR from "swr";

export type UseBookingSlotProps = {
  commonAreaId: number;
  slotId: number;
  date: string;
  timezoneOffsetMinutes: number;
};

export const useBookingSlot = ({
  commonAreaId,
  slotId,
  date,
  timezoneOffsetMinutes,
}: UseBookingSlotProps) => {
  const { CommonAreasService } = useServices();
  return useSWR(
    [
      "nextcondo",
      "commonAreas",
      "bookingSlots",
      commonAreaId,
      slotId,
      date,
      timezoneOffsetMinutes,
    ],
    () =>
      CommonAreasService.GetBookingSlotAsync(
        commonAreaId,
        slotId,
        date,
        timezoneOffsetMinutes
      ),
    { refreshInterval: 1000 * 30 }
  );
};
