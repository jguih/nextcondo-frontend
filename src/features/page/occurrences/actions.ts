"use server";

import { Locale } from "@/i18n-config";
import { IOccurrencesService } from "@/src/services/nextcondo/occurrences/IOccurrencesService";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { revalidatePath } from "next/cache";
import { getDictionary } from "../../localization/get-dictionary";

export const ActionDeleteOccurrenceAsync = async (
  occurrenceId: string,
  lang: Locale,
  deleteAsync: IOccurrencesService["DeleteAsync"] = OccurrencesService.DeleteAsync.bind(
    OccurrencesService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<IOccurrencesService["DeleteAsync"]>>;
  message: string;
}> => {
  const result = await deleteAsync(occurrenceId);
  const d = await getDictionary(lang);

  if (result.success) {
    nextRevalidatePath(`/occurrences/${occurrenceId}`);
    nextRevalidatePath(`/occurrences`);
    return {
      result,
      message: d.page["occurrences/[id]"].succeeded_delete_occurrence,
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
      message: d.error.occurrence_not_found,
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

export const ActionAddOccurrenceAsync = async (
  data: FormData,
  lang: Locale,
  addAsync: IOccurrencesService["AddAsync"] = OccurrencesService.AddAsync.bind(
    OccurrencesService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<IOccurrencesService["AddAsync"]>>;
  message: string;
}> => {
  const result = await addAsync(data);
  const d = await getDictionary(lang);

  if (result.success) {
    nextRevalidatePath("/occurrences");
    return {
      result,
      message: d.page["occurrences/add"].succeeded_create_occurrence,
    };
  }

  // Error
  if (result.response && result.response.statusCode === 401) {
    return {
      result,
      message: d.error.not_authorized_to_perform_action,
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

export const ActionEditOccurrenceAsync = async (
  data: FormData,
  lang: Locale,
  editAsync: IOccurrencesService["EditAsync"] = OccurrencesService.EditAsync.bind(
    OccurrencesService
  ),
  nextRevalidatePath: typeof revalidatePath = revalidatePath
): Promise<{
  result: Awaited<ReturnType<IOccurrencesService["EditAsync"]>>;
  message: string;
}> => {
  const id = data.get("id") as string | undefined;
  const result = await editAsync(data);
  const d = await getDictionary(lang);

  if (result.success && id) {
    nextRevalidatePath(`/occurrences/${id}`);
    nextRevalidatePath(`/occurrences/${id}/edit`);
    nextRevalidatePath("/occurrences");
    return {
      result,
      message: d.page["occurrences/[id]/edit"].succeeded_update_occurrence,
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
      message: d.error.occurrence_not_found,
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
