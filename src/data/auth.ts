import { z } from "zod";
import { fetchNextCondoApi } from "./utils";

export const login = async (credentials: FormData) => {
  return await fetchNextCondoApi({
    endpoint: "/Auth/login",
    body: credentials,
    schema: z.object({}),
  });
};

export const loggout = () => {};

export const register = () => {};
