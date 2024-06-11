"use server";

import { createClient } from "@/src/shared/authentication/supabase/server";

export interface FormState {
  error?: {
    message: string;
  };
  message?: string;
}

export const signUp = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const supabase = createClient();

  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(values);

  if (error) {
    return {
      error: {
        message: error.message,
      },
    };
  }

  return {
    message: "Please, check your email to complete your registration",
  };
};
