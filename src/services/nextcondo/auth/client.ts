"use client";

import { IAuthService } from "./IAuthService";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { LogService } from "../../logger/client";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

type UseAuthServiceProps = {
  nextcondoBackendPublicUrl: string;
};

/**
 * Client side implementation of `IAuthService`.
 * @returns `IAuthService`
 */
export const useAuthService = ({
  nextcondoBackendPublicUrl,
}: UseAuthServiceProps): IAuthService => {
  const client = createFetchClient(nextcondoBackendPublicUrl);

  const LoginAsync: IAuthService["LoginAsync"] = async (credentials) => {
    const endpoint = "/Auth/login";
    const result = await client.postAsync({
      endpoint,
      strategy: new EmptyStrategy(),
      credentials: "include",
      body: credentials,
    });
    if (result.success) {
      LogService.info({
        from: "AuthService",
        message: "User logged in",
        fetch_url: result.url,
        status_code: result.response.statusCode,
      });
    } else {
      LogService.error({
        from: "AuthService",
        message: "User login failed",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result.success;
  };

  const LogoutAsync: IAuthService["LogoutAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Auth/logout",
      strategy: new EmptyStrategy(),
      credentials: "include",
    });
    if (result.success) {
      LogService.info({
        from: "AuthService",
        message: "User logged out",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      });
    } else {
      LogService.error({
        from: "AuthService",
        message: "User logout failed",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result.success;
  };

  const RegisterAsync: IAuthService["RegisterAsync"] = async (data) => {
    const result = await client.postAsync({
      endpoint: "/Auth/register",
      strategy: new EmptyStrategy(),
      body: data,
    });
    if (result.success) {
      LogService.info({
        from: "AuthService",
        message: "User registered",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      });
    } else {
      LogService.error({
        from: "AuthService",
        message: "User registration failed",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result.success;
  };

  return {
    LoginAsync,
    LogoutAsync,
    RegisterAsync,
  };
};
