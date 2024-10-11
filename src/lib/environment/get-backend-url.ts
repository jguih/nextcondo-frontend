import "server-only";

export const getNextCondoBackendUrl = (): string => {
  if (!process.env.NEXTCONDO_BACKEND_URL) {
    throw new Error("NEXTCONDO_BACKEND_URL environment variable not available");
  }
  return process.env.NEXTCONDO_BACKEND_URL;
};
