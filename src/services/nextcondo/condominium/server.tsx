import "server-only";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { CondominiumDto, schemas } from "./schemas";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { headers } from "next/headers";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";
import { LogService } from "../../logger/server";

class NextCondoCondominiumService implements ICondominiumService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  async AddAsync(data: FormData): Promise<boolean> {
    const result = await this.client.postAsync({
      endpoint: "/Condominium",
      strategy: new EmptyStrategy(),
      credentials: "include",
      headers: headers(),
      body: data,
    });
    if (result.success) {
      LogService.info({
        from: "CondominiumService",
        message: "New condominium added successfully",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      });
    } else {
      LogService.error({
        from: "CondominiumService",
        message: "Failed to add new condominium",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result.success;
  }

  async GetMineAsync(): Promise<FetchClientResponse<CondominiumDto[]>> {
    const result = await this.client.getAsync({
      endpoint: "/Condominium/mine",
      credentials: "include",
      headers: headers(),
      strategy: new JsonStrategy(schemas.getMineResponse),
    });
    if (result.success) {
      LogService.info(
        {
          from: "CondominiumService",
          message: "Fetched condominium list for current user",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { condominium_id_list: result.response.data?.map((c) => c.id) }
      );
    } else {
      LogService.error({
        from: "CondominiumService",
        message: "Failed to fetch condominium list for current user",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  }

  async GetMineCurrentAsync(): Promise<FetchClientResponse<CondominiumDto>> {
    const result = await this.client.getAsync({
      endpoint: "/Condominium/mine/current",
      credentials: "include",
      headers: headers(),
      strategy: new JsonStrategy(schemas.getMineCurrentReponse),
    });
    if (result.success) {
      LogService.info(
        {
          from: "CondominiumService",
          message: "Fetched current condominium for current user",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { condominium_id: result.response.data?.id }
      );
    } else {
      LogService.error({
        from: "CondominiumService",
        message: "Failed to fetch current condominium for current user",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  }
}

export const CondominiumService = new NextCondoCondominiumService();
