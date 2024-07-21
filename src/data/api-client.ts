import "server-only";
import { createClient } from "../shared/authentication/supabase/server";

export const createApiRequest = async (
  endpoint: string,
  init?: RequestInit
) => {
  if (!process.env.PROJECT_SIMPLIFY_API) {
    throw new Error("PROJECT_SIMPLIFY_API env empty, check .env vars");
  }

  const supabase = createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return new Request(
    `${process.env.PROJECT_SIMPLIFY_API}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`,
    { headers, ...init }
  );
};
