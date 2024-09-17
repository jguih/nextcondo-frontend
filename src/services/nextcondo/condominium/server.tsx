import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { CondominiumDto, schemas } from "./schemas";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { headers } from "next/headers";

class NextCondoCondominiumService implements ICondominiumService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  async AddAsync(data: FormData): Promise<boolean> {
    const result = await this.client.postAsync({
      endpoint: "/Condominium",
      strategy: new JsonStrategy(schemas.addCondominiumResponse),
      credentials: "include",
      headers: headers(),
      body: data,
    });
    return result.success;
  }

  async GetMineAsync(): Promise<FetchClientResponse<CondominiumDto[]>> {
    return await this.client.getAsync({
      endpoint: "/Condominium/mine",
      credentials: "include",
      headers: headers(),
      strategy: new JsonStrategy(schemas.getMineCondominiumResponse),
    });
  }
}

export const CondominiumService = new NextCondoCondominiumService();
