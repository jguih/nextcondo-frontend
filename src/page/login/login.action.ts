"use server";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface FormState {
  error?: {
    messages: string[];
  };
}

export const login = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const d = await getDictionary(lang);
  const supabase = createClient();
  const loginCredencialsSchema = z
    .object({
      email: z
        .string({
          invalid_type_error: d.validation.required_or_invalid_email,
          required_error: d.validation.required_or_invalid_email,
        })
        .email(d.validation.required_or_invalid_email)
        .min(1, d.validation.required_or_invalid_email),
      password: z
        .string({
          invalid_type_error: d.validation.required_password,
          required_error: d.validation.required_password,
        })
        .min(1, d.validation.required_password),
    })
    .required();

  const raw = {
    email: formData.get("email")?.valueOf(),
    password: formData.get("password")?.valueOf(),
  };

  const parsed = await loginCredencialsSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      error: {
        messages: Object.values(parsed.error.flatten().fieldErrors).flat(),
      },
    };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return {
      error: {
        messages: [d.validation.invalid_login_credentials],
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
