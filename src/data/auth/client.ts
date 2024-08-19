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

export const logoutAsync = () => {};

export const registerAsync = () => {};
