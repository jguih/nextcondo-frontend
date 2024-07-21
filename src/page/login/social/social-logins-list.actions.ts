"use server";

import { createClient } from "@/src/shared/authentication/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};
