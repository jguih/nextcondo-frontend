"use client";

import { IAuthService } from "./IAuthService";
import { authSchema } from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { LogService } from "../../logger/client";

type UseAuthServiceProps = {
  nextcondoBackendPublicUrl: string;
};

/**
 * Client only implementation of NextCondoBackend IAuthService.
 * @returns `IAuthService`
 */
export const useAuthService = ({
  nextcondoBackendPublicUrl,
}: UseAuthServiceProps): IAuthService => {
  const client = createFetchClient(nextcondoBackendPublicUrl);

  const LoginAsync: IAuthService["LoginAsync"] = async (credentials) => {
    const result = await client.postAsync({
      endpoint: "/Auth/login",
      strategy: new JsonStrategy(authSchema.login),
      credentials: "include",
      body: credentials,
    });
    if (result.success) {
      LogService.info("Login successfull", result.response);
    } else {
      LogService.error("Login failed", result.response);
    }
    return result.success;
  };

  const LogoutAsync: IAuthService["LogoutAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Auth/logout",
      strategy: new JsonStrategy(authSchema.logout),
      credentials: "include",
    });
    if (result.success) {
      LogService.info("Logout successfull", result.response);
    } else {
      LogService.error("Logout failed", result);
    }
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
