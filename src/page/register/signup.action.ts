"use server";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { z } from "zod";

export interface FormState {
  error?: {
    messages: string[];
  };
  message?: string;
}

export const signUp = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const supabase = createClient();
  const d = await getDictionary(lang);
  const createUserSchema = z
    .object({
      email: z
        .string({
          invalid_type_error: d.validation.required_email,
          required_error: d.validation.required_email,
        })
        .email(d.validation.required_email)
        .min(1, d.validation.required_email),
      password: z
        .string({
          invalid_type_error: d.validation.required_password,
          required_error: d.validation.required_password,
        })
        .min(8, d.validation.required_password),
      name: z
        .string({
          invalid_type_error: d.validation.required_full_name,
          required_error: d.validation.required_full_name,
        })
        .max(255, d.validation.required_full_name)
        .min(1, d.validation.required_full_name),
      phone: z.string({ invalid_type_error: d.validation.required_phone }),
    })
    .required();

  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = await createUserSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      error: {
        messages: Object.values(parsed.error.flatten().fieldErrors).flat(),
      },
    };
  }

  const { email, password, name, phone } = parsed.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });
  if (error && error.code !== "user_already_exists") {
    return {
      error: {
        messages: [d.page.register.fail],
      },
    };
  }

  return {
    message: d.page.register.success,
  };
};
