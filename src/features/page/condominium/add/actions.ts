"use server";

import { i18n, Locale } from "@/i18n-config";
import { ICondominiumService } from "@/src/services/nextcondo/condominium/ICondominiumService";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { revalidatePath } from "next/cache";
import { getDictionary } from "../../../localization/get-dictionary";

export const ActionAddCondominiumAsync = async (
  data: FormData,
  lang: Locale = i18n.defaultLocale,
  addCondominiumAsync: ICondominiumService["AddAsync"] = CondominiumService.AddAsync.bind(
    CondominiumService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
) => {
  const result = await addCondominiumAsync(data);
  const d = await getDictionary(lang);

  if (result.success) {
    nextRevalidatePath(`/`);
    return {
      result,
      message: d.page["condominium/add"].succeeded_create_condominium,
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
