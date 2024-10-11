import "server-only";
import { IUsersService } from "./IUsersService";
import { User, userSchema } from "./schemas";
import { headers } from "next/headers";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

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
          ...getLogMessageFromFetchClientResponse(result),
          from: "UsersService",
          message: "Fetched current user successfully",
        },
        { user_id: result.response.data?.id }
      );
      return result.response.data;
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "UsersService",
        message: "Failed to fetch current user",
      });
    }
  }
}

export const UsersService = new NextCondoApiUsersService();
