"use server";

import { getDictionary } from "@/src/localization/dictionaries";
import { format } from "@/src/localization/utils";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface FormState {
  error?: {
    message: string[];
  };
}

export const login = async (
  prevState: FormState,
  formData: FormData,
  lang: string
): Promise<FormState> => {
  const d = await getDictionary(lang);
  const supabase = createClient();

  const z_loginSchema = z.object({
    email: z
      .string({ message: d.validation.invalid_email })
      .email({ message: d.validation.invalid_email })
      .min(1, { message: d.validation.invalid_email }),
    password: z.string().min(8, {
      message: format(d.validation.password_too_short, { count: 8 }),
    }),
  });

  const raw = {
    email: formData.get("email")?.valueOf(),
    password: formData.get("password")?.valueOf(),
  };

  const parsed = await z_loginSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      error: {
        message: Object.values(parsed.error.flatten().fieldErrors).flat(),
      },
    };
  }

  const { error, data } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return {
      error: {
        message: [d.validation.invalid_login_credentials],
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
