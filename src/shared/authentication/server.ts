import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const authenticate = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return { data };
};
