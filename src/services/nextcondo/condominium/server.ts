import "server-only";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import {
  GetMineCurrentCondominiumResponse,
  GetMineCondominiumResponse,
  schemas,
  SetMineCurrentCondominiumResponse,
} from "./schemas";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { headers } from "next/headers";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

class NextCondoCondominiumService implements ICondominiumService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  GetCookies(): string {
    return headers().get("cookie") ?? "";
  }

  async AddAsync(data: FormData): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.postAsync({
      endpoint: "/Condominium",
      strategy: new EmptyStrategy(),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      body: data,
    });
    if (result.success) {
      LogService.info({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CondominiumService",
        message: "New condominium added successfully",
      });
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CondominiumService",
        message: "Failed to add new condominium",
      });
    }
    return result;
  }

  async GetMineAsync(): Promise<
    FetchClientResponse<GetMineCondominiumResponse>
  > {
    const result = await this.client.getAsync({
      endpoint: "/Condominium/mine",
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      strategy: new JsonStrategy(schemas.getMine),
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Fetched condominium list for current user",
        },
        { condominium_id_list: result.response.data?.map((c) => c.id) }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CondominiumService",
        message: "Failed to fetch condominium list for current user",
      });
    }
    return result;
  }

  async GetMineCurrentAsync(): Promise<
    FetchClientResponse<GetMineCurrentCondominiumResponse>
  > {
    const result = await this.client.getAsync({
      endpoint: "/Condominium/mine/current",
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      strategy: new JsonStrategy(schemas.getMineCurrent),
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Fetched current condominium for current user",
        },
        { condominium_id: result.response.data?.id }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CondominiumService",
        message: "Failed to fetch current condominium for current user",
      });
    }
    return result;
  }

  async SetMineCurrentAsync(
    id: string
  ): Promise<FetchClientResponse<SetMineCurrentCondominiumResponse>> {
    const result = await this.client.postAsync({
      endpoint: `/Condominium/mine/current/${id}`,
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      strategy: new JsonStrategy(schemas.setMineCurrentResponse),
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Set current condominium for current user successfully",
        },
        { condominium_id: id }
      );
    } else {
      LogService.error(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Failed to set current condominium for current user",
        },
        { condominium_id: id }
      );
    }
    return result;
  }

  async JoinAsync(id: string): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.postAsync({
      endpoint: `/Condominium/join/${id}`,
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      strategy: new EmptyStrategy(),
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Join condominium successfully",
        },
        { condominium_id: id }
      );
    } else {
      LogService.error(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CondominiumService",
          message: "Failed to join condominium",
        },
        { condominium_id: id }
      );
    }
    return result;
  }
}

export const CondominiumService: ICondominiumService =
  new NextCondoCondominiumService();
