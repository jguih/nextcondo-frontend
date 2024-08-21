import "server-only";

export const getNextCondoApiUrl = (): string => {
  if (!process.env.NEXTCONDOAPI_URL) {
    throw new Error("NEXTCONDOAPI_URL not found, check enviroment variables");
  }
  return process.env.NEXTCONDOAPI_URL;
};

export const getNextCondoApiPublicUrl = (): string => {
  if (!process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL) {
    throw new Error("NEXTCONDOAPI_URL not found, check enviroment variables");
  }
  return process.env.NEXT_PUBLIC_NEXTCONDOAPI_URL;
};
