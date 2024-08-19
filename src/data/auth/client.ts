import { z } from "zod";
import { fetchNextCondoApi } from "../nextCondoApiClient/client";

export const loginAsync = async (url: string, credentials: FormData) => {
  return await fetchNextCondoApi(url, {
    endpoint: "/Auth/login",
    credentials: "include",
    body: credentials,
    method: "POST",
    schema: z.object({}),
  });
};

export const logoutAsync = async (url: string) => {
  return await fetchNextCondoApi(url, {
    endpoint: "/Auth/logout",
    credentials: "include",
    method: "GET",
    schema: z.object({}),
  });
};

export const registerAsync = async () => {};
