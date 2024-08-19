"use server";

export const getEnv = async () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw Error(
      "Supabase public url is empty. NEXT_PUBLIC_SUPABASE_URL enviroment variable is required to be set."
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw Error(
      "Supabase anon key is empty. NEXT_PUBLIC_SUPABASE_ANON_KEY enviroment variable is required to be set."
    );
  }

  if (!process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL) {
    throw Error(
      "NextCondoApi Public URL is empty. NEXT_PUBLIC_NEXTCONDOAPI_URL enviroment variable is required to be set."
    );
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_NEXTCONDOAPI_URL: process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL,
  };
};
