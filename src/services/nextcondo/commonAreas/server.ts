import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICommonAreasService } from "./ICommonAreasService";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { GetCommonAreasResponseDto, schemas } from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { headers } from "next/headers";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

export class NextCondoCommonAreasService implements ICommonAreasService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  GetCookies(): string {
    return headers().get("cookie") ?? "";
  }

  async GetAsync(): Promise<FetchClientResponse<GetCommonAreasResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: "/CommonAreas",
      strategy: new JsonStrategy(schemas.getCommonAreasResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      LogService.info(
        {
          ...getLogMessageFromFetchClientResponse(result),
          from: "CommonAreasService",
          message: "Fetched common area list successfully",
        },
        {
          common_area_id_list: result.response.data?.map((area) => area.id),
        }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed to fetch common area list",
      });
    }
    return result;
  }
}

export const CommonAreasService: ICommonAreasService =
  new NextCondoCommonAreasService();
