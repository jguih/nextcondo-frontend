import { z } from "zod";
import { useEnv } from "@/src/shared/env/context";
import { createFetchClient } from "../fetchClient/client";
import { JsonStrategy } from "../fetchClient/strategy";

export const useAuthService = () => {
  const { NEXT_PUBLIC_NEXTCONDOAPI_URL } = useEnv();
  const client = createFetchClient(NEXT_PUBLIC_NEXTCONDOAPI_URL);

  const loginSchema = z.object({});
  const loginStrategy = new JsonStrategy(loginSchema);
  const loginAsync = async (credentials: FormData) => {
    return await client.postAsync({
      endpoint: "/Auth/login",
      strategy: loginStrategy,
      credentials: "include",
      body: credentials,
    });
  };

  const logoutSchema = z.object({});
  const logoutStrategy = new JsonStrategy(logoutSchema);
  const logoutAsync = async () => {
    return await client.getAsync({
      endpoint: "/Auth/logout",
      strategy: logoutStrategy,
      credentials: "include",
    });
  };

  const registerSchema = z.object({});
  const registerStrategy = new JsonStrategy(registerSchema);
  const registerAsync = async (data: FormData) => {
    return await client.postAsync({
      endpoint: "/Auth/register",
      strategy: registerStrategy,
      body: data,
    });
  };

  return {
    loginAsync,
    logoutAsync,
    registerAsync,
  };
};
