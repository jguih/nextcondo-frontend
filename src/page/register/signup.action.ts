"use server";

import { Locale } from "@/i18n-config";
import { registerUser } from "@/src/data/user";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { z } from "zod";

export interface FormState {
  submited: boolean;
  error?: {
    message: string;
  };
  message?: string;
}

const createUserSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(8).max(30),
    name: z.string().max(255).min(1),
    phone: z
      .string()
      .nullable()
      .transform((x) => x || null),
  })
  .required();

export const signUp = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const supabase = createClient();
  const d = await getDictionary(lang);

  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = await createUserSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      submited: true,
      error: {
        message: d.page.register.fail,
      },
    };
  }

  const { email, password, name, phone } = parsed.data;
  const { error, data } = await supabase.auth.signUp({
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
      submited: true,
      error: {
        message: d.page.register.fail,
      },
    };
  }

  if (data.session)
    await registerUser(data.session, {
      fullName: parsed.data.name,
      phone: parsed.data.phone,
    });

  return { submited: true, message: d.page.register.success };
};
