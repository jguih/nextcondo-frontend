"use server";

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/localization/dictionaries";
import { createClient } from "@/src/shared/authentication/supabase/server";
import { getSchema } from "./validation/schema";
import { getSchemaMessages } from "./validation/get-schema-messages";

export interface FormState {
  error?: {
    message: string[];
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
  const createUserSchema = getSchema(getSchemaMessages(d));

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
        message: Object.values(parsed.error.flatten().fieldErrors).flat(),
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
        message: [d.page.register.fail],
      },
    };
  }

  return {
    message: d.page.register.success,
  };
};
