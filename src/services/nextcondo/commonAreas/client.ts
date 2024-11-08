"use client";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { ICommonAreasService } from "./ICommonAreasService";
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
import { LogService } from "../../logger/client";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

export class NextCondoCommonAreasService implements ICommonAreasService {
  client: IFetchClient;

  constructor(nextcondoBackendPublicUrl: string) {
    this.client = createFetchClient(nextcondoBackendPublicUrl);
  }

  async GetAsync(): Promise<FetchClientResponse<GetCommonAreasResponseDto>> {
    throw new Error("Not Implemented");
  }

  async GetByIdAsync(): Promise<
    FetchClientResponse<GetCommonAreaByIdResponseDto>
  > {
    throw new Error("Not Implemented");
  }

  async GetBookingSlotAsync(
    id: number,
    slotId: number,
    date: string,
    timezoneOffsetMinutes: number
  ): Promise<FetchClientResponse<GetBookingSlotResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: `/CommonAreas/${id}/slot/${slotId}/date/${date}/bookingSlots?timezoneOffsetMinutes=${timezoneOffsetMinutes}`,
      strategy: new JsonStrategy(schemas.getBookingSlotResponseDto),
      credentials: "include",
    });
    if (result.success) {
      LogService.info({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Fetched booking slots successfully",
      });
    } else {
      LogService.error({
        ...getLogMessageFromFetchClientResponse(result),
        from: "CommonAreasService",
        message: "Failed to fetch booking slots",
      });
    }
    return result;
  }

  async AddReservationAsync(): Promise<FetchClientResponse<undefined>> {
    throw new Error("Not Implemented");
  }

  async GetReservationsAsync(): Promise<
    FetchClientResponse<GetReservationsResponseDto>
  > {
    throw new Error("Not Implemented");
  }

  async GetTypesAsync(): Promise<
    FetchClientResponse<GetCommonAreaTypesResponseDto>
  > {
    throw new Error("Not Implemented");
  }

  async AddAsync(): Promise<FetchClientResponse<undefined>> {
    throw new Error("Not Implemented");
  }
}
