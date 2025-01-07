import "server-only";
import { IUsersService } from "./IUsersService";
import { User, userSchema } from "./schemas";
import { headers } from "next/headers";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";
import { CondominiumService } from "../condominium/server";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

export class NextCondoApiUsersService implements IUsersService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  GetCookies(): string {
    return headers().get("cookie") ?? "";
  }

  async GetMeAsync(): Promise<User | undefined> {
    const result = await this.client.getAsync({
      strategy: new JsonStrategy(userSchema),
      endpoint: "/Users/me",
      headers: {
        cookie: this.GetCookies(),
      },
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

  async IsOwnerOrManagerOfCurrentCondominium(): Promise<boolean> {
    const me = await this.GetMeAsync();
    const result = await CondominiumService.GetMineCurrentAsync();
    const currentCondominium =
      result.success && result.hasData ? result.response.data : undefined;
    if (!currentCondominium || !me) return false;
    if (currentCondominium.owner.id === me.id) {
      return true;
    }
    if (
      currentCondominium.members.some(
        (member) => member.id === me.id && member.relationshipType === "Manager"
      )
    ) {
      return true;
    }
    LogService.warn(
      {
        from: "UsersService",
        message:
          "Current user is not manager or owner of current condominium. Some functionalities may not be accessible.",
      },
      { user_id: me.id, condominium_id: currentCondominium.id }
    );
    return false;
  }

  async EditMeAsync(data: FormData): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.putAsync({
      strategy: new EmptyStrategy(),
      endpoint: "/Users/me",
      headers: {
        cookie: this.GetCookies(),
      },
      credentials: "include",
      body: data,
    });
    if (result.success) {
      LogService.info({
        ...getLogMessageFromFetchClientResponse(result),
        from: "UsersService",
        message: "Updated current user successfully",
      });
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "UsersService",
        message: "Failed to update current user",
      });
    }
    return result;
  }
}

export const UsersService: IUsersService = new NextCondoApiUsersService();
