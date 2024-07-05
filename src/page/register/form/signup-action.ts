"use server";

import { getDictionary } from "@/src/localization/dictionaries";
import { format } from "@/src/localization/utils";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { z } from "zod";

export interface FormState {
  error?: {
    message: string[];
  };
  message?: string;
}

export const signUp = async (
  prevState: FormState,
  formData: FormData,
  lang: string
): Promise<FormState> => {
  const supabase = createClient();
  const d = await getDictionary(lang);

  const z_registerSchema = z.object({
    email: z
      .string({ message: d.validation.invalid_email })
      .email({ message: d.validation.invalid_email })
      .min(1, { message: d.validation.invalid_email }),
    password: z.string().min(8, {
      message: format(d.validation.password_too_short, { count: 8 }),
    }),
    name: z.string().max(255),
    phone: z.string(),
  });

  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = await z_registerSchema.safeParseAsync(raw);

  if (parsed.success) {
    const data = parsed.data;
    const { email, password, name, phone } = data;
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
        },
      },
    });
  }

  if (parsed.error) {
    return {
      error: {
        message: Object.values(parsed.error.flatten().fieldErrors).flat(),
      },
    };
  }

  return {
    message: d.page.register.success,
  };
};
