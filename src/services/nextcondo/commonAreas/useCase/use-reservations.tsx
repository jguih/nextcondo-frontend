"use client";
import { getUserTimezoneOffsetMinutes } from "@/src/lib/utils/timezone/timezone-utils";
import { useServices } from "@/src/services/components/provider";
import useSWR from "swr";

export const useCommonAreaReservations = () => {
  const { CommonAreasService } = useServices();
  return useSWR(["nextcondo", "commonAreas", "reservations"], () =>
    CommonAreasService.GetReservationsAsync(getUserTimezoneOffsetMinutes())
  );
};
