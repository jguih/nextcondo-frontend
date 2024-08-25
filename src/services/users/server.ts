import "server-only";
import { createFetchClient, IFetchClient } from "@/src/data/fetchClient/client";
import { IUsersService } from "./IUsersService";
import { getNextCondoApiUrl } from "@/src/shared/env/utils";
import { JsonStrategy } from "@/src/data/fetchClient/strategy";
import { userSchema } from "./schemas";
import { headers } from "next/headers";

export class NextCondoApiUsersService implements IUsersService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoApiUrl());
  }

  async GetMeAsync() {
    const result = await this.client.getAsync({
      strategy: new JsonStrategy(userSchema),
      endpoint: "/Users/me",
      headers: headers(),
      credentials: "include",
    });
    if (result.success) {
      return result.response.data;
    }
  }
}

export const UsersService = new NextCondoApiUsersService();
