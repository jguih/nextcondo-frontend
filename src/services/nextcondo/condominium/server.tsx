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
      LogService.info("Condominium created\n", JSON.stringify(result, null, 2));
    } else {
      LogService.error(
        "Failed to create condominium\n",
        JSON.stringify(result, null, 2)
      );
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
        "Fetched condominium for current user\n",
        JSON.stringify(result, null, 2)
      );
    } else {
      LogService.error(
        "Failed to fetch condominium for current user\n",
        JSON.stringify(result, null, 2)
      );
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
        "Fetched current condominium for current user\n",
        JSON.stringify(result, null, 2)
      );
    } else {
      LogService.error(
        "Failed to fetch current condominium for current user\n",
        JSON.stringify(result, null, 2)
      );
    }
    return result;
  }
}

export const CondominiumService = new NextCondoCondominiumService();
