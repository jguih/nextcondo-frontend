"use server";

export const getEnv = async () => {
  if (!process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL) {
    throw Error(
      "NextCondoApi Public URL is empty. NEXT_PUBLIC_NEXTCONDOAPI_URL enviroment variable is required to be set."
    );
  }

  return {
    NEXT_PUBLIC_NEXTCONDOAPI_URL: process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL,
  };
};
