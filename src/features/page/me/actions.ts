"use server";

import { i18n, Locale } from "@/i18n-config";
import { IUsersService } from "@/src/services/nextcondo/users/IUsersService";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { revalidatePath } from "next/cache";
import { getDictionary } from "../../localization/get-dictionary";

export const ActionEditMeAsync = async (
  data: FormData,
  lang: Locale = i18n.defaultLocale,
  editMeAsync: IUsersService["EditMeAsync"] = UsersService.EditMeAsync.bind(
    UsersService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<IUsersService["EditMeAsync"]>>;
  message: string;
}> => {
  const result = await editMeAsync(data);
  const d = await getDictionary(lang);

  if (result.success) {
    nextRevalidatePath(`/me`);
    return {
      result,
      message: d.page.me.succeeded_edit_user,
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
