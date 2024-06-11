"use server";

import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface FormState {
  message?: string;
}

export const login = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
