"use server";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/localization/dictionaries";
import { format } from "@/src/localization/utils";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSchema } from "./validation/schema";

export interface FormState {
  error?: {
    message: string[];
  };
}

export const login = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const d = await getDictionary(lang);
  const supabase = createClient();
  const loginCredencialsSchema = getSchema({
    email: {
      invalid: d.validation.invalid_email,
      required: d.validation.required,
    },
    password: {
      invalid: d.validation.invalid,
      required: d.validation.required,
    },
  });

  const raw = {
    email: formData.get("email")?.valueOf(),
    password: formData.get("password")?.valueOf(),
  };

  const parsed = await loginCredencialsSchema.safeParseAsync(raw);

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
