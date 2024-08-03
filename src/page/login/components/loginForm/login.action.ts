"use server";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState =
  | {
      isError: true;
      errorMessage: string;
    }
  | {
      isError: false;
    };

const loginCredencialsSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  })
  .required();

export const login = async (
  prevState: FormState,
  formData: FormData,
  lang: Locale
): Promise<FormState> => {
  const d = await getDictionary(lang);
  const supabase = createClient();

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

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return {
      isError: true,
      errorMessage: d.validation.invalid_login_credentials,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
