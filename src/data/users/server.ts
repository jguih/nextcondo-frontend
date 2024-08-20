import "server-only";
import { headers } from "next/headers";
import { userSchema } from "../schemas/users";
import { getNextCondoApiUrl } from "../utils";
import { createFetchClient } from "../fetchClient/client";
import { JsonStrategy } from "../fetchClient/strategy";

export const getUsersService = () => {
  const client = createFetchClient(getNextCondoApiUrl());

  const getMeAsync = async () => {
    return await client.getAsync({
      strategy: new JsonStrategy(userSchema),
      endpoint: "/Users/me",
      headers: headers(),
      credentials: "include",
    });
  };

  return { getMeAsync };
};
