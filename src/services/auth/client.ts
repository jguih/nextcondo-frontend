"use client";
import { IAuthService } from "./IAuthService";
import { authSchema } from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/strategy";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { useEnv } from "@/src/components/env/context";

export const useAuthService = (): IAuthService => {
  const { NEXT_PUBLIC_NEXTCONDOAPI_URL } = useEnv();
  const client = createFetchClient(NEXT_PUBLIC_NEXTCONDOAPI_URL);

  const LoginAsync: IAuthService["LoginAsync"] = async (credentials) => {
    const result = await client.postAsync({
      endpoint: "/Auth/login",
      strategy: new JsonStrategy(authSchema.login),
      credentials: "include",
      body: credentials,
    });
    return result.success;
  };

  const LogoutAsync: IAuthService["LogoutAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Auth/logout",
      strategy: new JsonStrategy(authSchema.logout),
      credentials: "include",
    });
    return result.success;
  };

  const RegisterAsync: IAuthService["RegisterAsync"] = async (data) => {
    const result = await client.postAsync({
      endpoint: "/Auth/register",
      strategy: new JsonStrategy(authSchema.register),
      body: data,
    });
    return result.success;
  };

  return {
    LoginAsync,
    LogoutAsync,
    RegisterAsync,
  };
};
