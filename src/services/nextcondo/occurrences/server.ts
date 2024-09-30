import "server-only";

import {
  FetchClientFailedResponse,
  FetchClientResponse,
} from "@/src/lib/fetchClient/types";
import { IOccurrencesService } from "./IOccurrencesService";
import {
  GetOccurrenceResponseDto,
  AddOccurrenceResponseDto,
  GetOccurrenceTypesResponseDto,
  schemas,
  GetOccurrenceByIdResponseDto,
} from "./schemas";
import { createFetchClient, IFetchClient } from "@/src/lib/fetchClient/client";
import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { headers } from "next/headers";
import { LogService } from "../../logger/server";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";
import { LogExtraFields } from "../../logger/types";

export class NextCondoOccurrencesService implements IOccurrencesService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoBackendUrl());
  }

  GetCookies(): string {
    return headers().get("cookie") ?? "";
  }

  LogInfo<Output>(
    result: FetchClientResponse<Output>,
    message: string,
    extra?: LogExtraFields
  ): void {
    LogService.info(
      {
        from: "OccurrencesService",
        message,
        http_method: result.method,
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      },
      extra
    );
  }

  LogError(
    result: FetchClientFailedResponse,
    message: string,
    extra?: LogExtraFields
  ): void {
    LogService.error(
      {
        from: "OccurrencesService",
        message: message,
        http_method: result.method,
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      },
      extra
    );
  }

  async GetAsync(): Promise<FetchClientResponse<GetOccurrenceResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: "/Occurrences",
      strategy: new JsonStrategy(schemas.getOccurrenceResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      this.LogInfo(result, "Fetched occurrences successfully", {
        occurrences_id_list: result.response.data?.map((o) => o.id),
      });
    } else {
      this.LogError(result, "Failed to fetch occurrences list");
    }
    return result;
  }

  async GetByIdAsync(
    id: string
  ): Promise<FetchClientResponse<GetOccurrenceByIdResponseDto>> {
    const result = await this.client.getAsync({
      endpoint: `Occurrences/${id}`,
      strategy: new JsonStrategy(schemas.getOccurrenceByIdResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      this.LogInfo(result, "Fetched occurrence successfully", {
        occurrence_id: result.response.data?.id,
      });
    } else {
      this.LogError(result, "Failed to fetch occurrence");
    }
    return result;
  }

  async AddAsync(
    data: FormData
  ): Promise<FetchClientResponse<AddOccurrenceResponseDto>> {
    const result = await this.client.postAsync({
      endpoint: "/Occurrences",
      strategy: new JsonStrategy(schemas.addOccurrenceResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
      body: data,
    });
    if (result.success) {
      this.LogInfo(result, "New occurrence added successfully", {
        occurrence_id: result.response.data?.id,
      });
    } else {
      this.LogError(result, "Failed to add new occurrence");
    }
    return result;
  }

  async GetTypesAsync(): Promise<
    FetchClientResponse<GetOccurrenceTypesResponseDto>
  > {
    const result = await this.client.getAsync({
      endpoint: "/Occurrences/types",
      strategy: new JsonStrategy(schemas.getOccurrenceTypesResponseDto),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      this.LogInfo(result, "Fetched occurrence types successfully", {
        occurrence_types_id_list: result.response.data?.map((o) => o.id),
      });
    } else {
      this.LogError(result, "Failed to fetch occurrence types list");
    }
    return result;
  }

  async DeleteAsync(id: string): Promise<FetchClientResponse<undefined>> {
    const result = await this.client.deleteAsync({
      endpoint: `Occurrences/${id}`,
      strategy: new EmptyStrategy(),
      credentials: "include",
      headers: {
        cookie: this.GetCookies(),
      },
    });
    if (result.success) {
      this.LogInfo(result, "Deleted occurrence successfully", {
        occurrence_id: id,
      });
    } else {
      this.LogError(result, "Failed to delete occurrence");
    }
    return result;
  }
}

export const OccurrencesService = new NextCondoOccurrencesService();
