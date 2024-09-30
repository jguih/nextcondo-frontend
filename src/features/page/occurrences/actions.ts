"use server";

import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteOccurrenceAsync = async (occurrenceId: string) => {
  await OccurrencesService.DeleteAsync(occurrenceId);

  revalidatePath(`/occurrences/${occurrenceId}`);
  revalidatePath(`/occurrences`);
  redirect("/occurrences");
};

export const addOccurrenceAsync = async (data: FormData) => {
  const result = await OccurrencesService.AddAsync(data);

  if (result.success && result.hasData) {
    revalidatePath("/occurrences");
    redirect(`/occurrences/${result.response.data.id}`);
  }

  return result;
};
