import "server-only";
import { headers } from "next/headers";
import { userSchema } from "../schemas/users";
import { fetchNextCondoApi } from "../nextCondoApiClient/server";
import { getNextCondoApiUrl } from "../utils";

export const getMeAsync = async () => {
  return await fetchNextCondoApi(getNextCondoApiUrl(), {
    endpoint: "/Users/me",
    method: "GET",
    headers: headers(),
    schema: userSchema,
  });
};
