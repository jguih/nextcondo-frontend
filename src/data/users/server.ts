import "server-only";
import { headers } from "next/headers";
import { userSchema } from "../schemas/users";
import { fetchNextCondoApi } from "../nextCondoApiClient/server";

export const getMeAsync = async () => {
  return await fetchNextCondoApi({
    endpoint: "/Users/me",
    method: "GET",
    headers: headers(),
    schema: userSchema,
  });
};
