"use client";

import { useServices } from "@/src/services/components/provider";
import useSWR from "swr";

export type UseBookingSlotProps = {
  commonAreaId: number;
  slotId: number;
  date: string;
};

export const useBookingSlot = ({
  commonAreaId,
  slotId,
  date,
}: UseBookingSlotProps) => {
  const { CommonAreasService } = useServices();
  return useSWR(
    ["nextcondo", "commonAreas", "bookingSlots", commonAreaId, slotId, date],
    () => CommonAreasService.GetBookingSlotAsync(commonAreaId, slotId, date),
    { refreshInterval: 1000 * 30 }
  );
};
