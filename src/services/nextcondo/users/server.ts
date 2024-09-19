import "server-only";
import { IUsersService } from "./IUsersService";
import { User, userSchema } from "./schemas";
import { headers } from "next/headers";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { LogService } from "../../logger/server";

export class NextCondoApiUsersService implements IUsersService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  async GetMeAsync(): Promise<User | undefined> {
    const result = await this.client.getAsync({
      strategy: new JsonStrategy(userSchema),
      endpoint: "/Users/me",
      headers: headers(),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: "UsersService",
          message: "Fetched current user successfully",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { user_id: result.response.data?.id }
      );
      return result.response.data;
    } else {
      LogService.error({
        from: "UsersService",
        message: "Failed to fetch current user",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
  }
}

export const UsersService = new NextCondoApiUsersService();
