"use server";

import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { ICommonAreasService } from "@/src/services/nextcondo/commonAreas/ICommonAreasService";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { revalidatePath } from "next/cache";

export const ActionEditCommonAreaAsync = async (
  data: FormData,
  lang: Locale = i18n.defaultLocale,
  editCommonAreaAsync: ICommonAreasService["EditAsync"] = CommonAreasService.EditAsync.bind(
    CommonAreasService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<ICommonAreasService["EditAsync"]>>;
  message: string;
}> => {
  const d = await getDictionary(lang);
  const result = await editCommonAreaAsync(data);

  if (result.success) {
    nextRevalidatePath("/commonAreas");
    return {
      result,
      message:
        d.page["condominium/admin/commonArea/edit"]
          .succeeded_update_common_area,
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
