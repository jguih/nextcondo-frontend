"use server";

import { Locale } from "@/i18n-config";
import { loginCredencialsSchema } from "@/src/data/schemas/auth";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as auth from "@/src/data/auth/client";
import { cookies, headers } from "next/headers";

export const login = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const d = await getDictionary(lang);
  // const supabase = createClient();

  const raw = {
    email: formData.get("email")?.valueOf(),
    password: formData.get("password")?.valueOf(),
  };

  const parsed = await loginCredencialsSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      isError: true,
      errorMessage: d.validation.invalid_login_credentials,
    };
  }

  // const { error } = await supabase.auth.signInWithPassword(parsed.data);
  const response = await auth.loginAsync(formData);
  const { success, headers } = response;
  if (!success) {
    return {
      isError: true,
      errorMessage: d.validation.invalid_login_credentials,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
