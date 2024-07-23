"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useEnv } from "../../env/context";

export function useSupabaseClient() {
  const env = useEnv();

  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    throw Error(
      "Supabase public url is empty. NEXT_PUBLIC_SUPABASE_URL enviroment variable is required to be set."
    );
  }

  if (!env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw Error(
      "Supabase anon key is empty. NEXT_PUBLIC_SUPABASE_ANON_KEY enviroment variable is required to be set."
    );
  }

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
