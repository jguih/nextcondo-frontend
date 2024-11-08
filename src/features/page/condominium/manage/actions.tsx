"use server";
import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { format } from "@/src/features/localization/utils";
import { ICondominiumService } from "@/src/services/nextcondo/condominium/ICondominiumService";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { revalidatePath } from "next/cache";

export const ActionSetCurrentCondominiumAsync = async (
  condominiumId: string,
  lang: Locale = i18n.defaultLocale,
  setCurrentCondominiumAsync: ICondominiumService["SetMineCurrentAsync"] = CondominiumService.SetMineCurrentAsync.bind(
    CondominiumService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<ICondominiumService["SetMineCurrentAsync"]>>;
  message: string;
}> => {
  const d = await getDictionary(lang);
  const result = await setCurrentCondominiumAsync(condominiumId);

  if (result.success) {
    nextRevalidatePath(`/`);
    nextRevalidatePath(`/condominium/mine`);
    return {
      result,
      message: format(
        d.page["condominium/mine"].succeeded_set_current_condominium,
        { name: result.response.data?.name ?? "" }
      ),
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
