"use server";

import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { ICommonAreasService } from "@/src/services/nextcondo/commonAreas/ICommonAreasService";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { revalidatePath } from "next/cache";

export const ActionAddReservationAsync = async (
  commonAreaId: number,
  data: FormData,
  lang: Locale = i18n.defaultLocale,
  addReservationAsync: ICommonAreasService["AddReservationAsync"] = CommonAreasService.AddReservationAsync.bind(
    CommonAreasService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<ICommonAreasService["AddReservationAsync"]>>;
  message: string;
}> => {
  const result = await addReservationAsync(commonAreaId, data);
  const d = await getDictionary(lang);

  if (result.success) {
    nextRevalidatePath(`/commonAreas/${commonAreaId}/booking`);
    nextRevalidatePath(`/commonAreas/bookingHistory`);
    return {
      result,
      message: d.page["commonAreas/[id]/booking"].succeeded_create_reservation,
    };
  }

  // Error
  if (result.response && result.response.statusCode === 401) {
    return {
      result,
      message: d.error.not_authorized_to_perform_action,
    };
  }

  if (result.response && result.response.statusCode === 404) {
    return {
      result,
      message: d.error.resource_not_found,
    };
  }

  if (!result.response) {
    return {
      result,
      message: d.error.failed_to_stablish_connection_with_server,
    };
  }

  return {
    result,
    message: d.error.generic,
  };
};
