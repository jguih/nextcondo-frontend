import "server-only";
import { IUsersService } from "./IUsersService";
import { userSchema } from "./schemas";
import { headers } from "next/headers";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";

export class NextCondoApiUsersService implements IUsersService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
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
