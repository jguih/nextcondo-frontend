import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ITenantsService } from "./ITenantsService";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { headers } from "next/headers";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { GetTenantsResponseDto, schemas } from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

export class NextCondoTenantsService implements ITenantsService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  GetCookies(): string {
    return headers().get("cookie") ?? "";
  }

  async GetAsync(): Promise<FetchClientResponse<GetTenantsResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: "/Tenants",
      strategy: new JsonStrategy(schemas.getTenantsResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "TenantsService",
          message: "Fetched tenants list successfully",
        },
        {
          tenants_id_list: result.response.data?.map((tenant) => tenant.id),
        }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "TenantsService",
        message: "Failed to fetch tenants list",
      });
    }
    return result;
  }
}

export const TenantsService: ITenantsService = new NextCondoTenantsService();
