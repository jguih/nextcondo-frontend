import "server-only";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICommonAreasService } from "./ICommonAreasService";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  GetBookingSlotResponseDto,
  GetCommonAreaByIdResponseDto,
  GetCommonAreasResponseDto,
  GetCommonAreaTypesResponseDto,
  GetReservationsResponseDto,
  schemas,
} from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { headers } from "next/headers";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

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

  async GetByIdAsync(
    id: number
  ): Promise<FetchClientResponse<GetCommonAreaByIdResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: `/CommonAreas/${id}`,
      strategy: new JsonStrategy(schemas.getCommonAreaByIdResponseDto),
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
          message: "Fetched common area successfully",
        },
        {
          common_area_id: result.response.data?.id,
        }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed to fetch common area",
      });
    }
    return result;
  }

  async GetBookingSlotAsync(): Promise<
    FetchClientResponse<GetBookingSlotResponseDto>
  > {
    throw new Error("Not Implemented");
  }

  async AddReservationAsync(
    id: number,
    data: FormData
  ): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.postAsync({
      endpoint: `/CommonAreas/${id}/reservation`,
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
        from: "CommonAreasService",
        message: "Created reservation successfully",
      });
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed Created reservation",
      });
    }
    return result;
  }

  async GetReservationsAsync(): Promise<
    FetchClientResponse<GetReservationsResponseDto>
  > {
    throw new Error("Not implemented");
  }

  async GetTypesAsync(): Promise<
    FetchClientResponse<GetCommonAreaTypesResponseDto>
  > {
    const result = await this.client.getAsync({
      endpoint: `/CommonAreas/types`,
      strategy: new JsonStrategy(schemas.getCommonAreaTypesResponseDto),
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
          message: "Fetched common area types successfully",
        },
        {
          common_area_type_id_list: result.response.data?.map(
            (type) => type.id
          ),
        }
      );
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed to fetch common area types",
      });
    }
    return result;
  }

  async AddAsync(data: FormData): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.postAsync({
      endpoint: `/CommonAreas`,
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
        from: "CommonAreasService",
        message: "Created common area successfully",
      });
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed to create common area",
      });
    }
    return result;
  }
}

export const CommonAreasService: ICommonAreasService =
  new NextCondoCommonAreasService();
