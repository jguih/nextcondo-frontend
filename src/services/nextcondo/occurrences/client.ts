import { createFetchClient } from "@/src/lib/fetchClient/client";
import { IOccurrencesService } from "./IOccurrencesService";
import { schemas } from "./schemas";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { LogService } from "../../logger/client";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

export const useOccurrencesService = ({
  nextcondoBackendPublicUrl,
}: {
  nextcondoBackendPublicUrl: string;
}): IOccurrencesService => {
  const client = createFetchClient(nextcondoBackendPublicUrl);

  const GetAsync: IOccurrencesService["GetAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Occurrences",
      strategy: new JsonStrategy(schemas.getOccurrenceResponseDto),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: "OccurrencesService",
          message: "Fetched occurrences successfully",
          http_method: "GET",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { occurrences_id_list: result.response.data?.map((o) => o.id) }
      );
    } else {
      LogService.error({
        from: "OccurrencesService",
        message: "Failed to fetch occurrences list",
        http_method: "GET",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  const GetByIdAsync: IOccurrencesService["GetByIdAsync"] = async (id) => {
    const result = await client.getAsync({
      endpoint: `Occurrences/${id}`,
      strategy: new JsonStrategy(schemas.getOccurrenceByIdResponseDto),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: "OccurrencesService",
          message: "Fetched occurrence successfully",
          http_method: "GET",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { occurrence_id: result.response.data?.id }
      );
    } else {
      LogService.error({
        from: "OccurrencesService",
        message: "Failed to fetch occurrence",
        http_method: "GET",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  const AddAsync: IOccurrencesService["AddAsync"] = async (data) => {
    const result = await client.postAsync({
      endpoint: "/Occurrences",
      strategy: new JsonStrategy(schemas.addOccurrenceResponseDto),
      credentials: "include",
      body: data,
    });
    if (result.success) {
      LogService.info(
        {
          from: "OccurrencesService",
          message: "New occurrence added successfully",
          http_method: "POST",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { occurrence_id: result.response.data?.id }
      );
    } else {
      LogService.error({
        from: "OccurrencesService",
        message: "Failed to add new occurrence",
        http_method: "POST",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  const GetTypesAsync: IOccurrencesService["GetTypesAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Occurrences/types",
      strategy: new JsonStrategy(schemas.getOccurrenceTypesResponseDto),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: "OccurrencesService",
          message: "Fetched occurrence types successfully",
          http_method: "GET",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { occurrence_types_id_list: result.response.data?.map((o) => o.id) }
      );
    } else {
      LogService.error({
        from: "OccurrencesService",
        message: "Failed to fetch occurrence types list",
        http_method: "GET",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  const DeleteAsync: IOccurrencesService["DeleteAsync"] = async (id) => {
    const result = await client.deleteAsync({
      endpoint: `Occurrences/${id}`,
      strategy: new EmptyStrategy(),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: "OccurrencesService",
          message: "Deleted occurrence successfully",
          http_method: "DELETE",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { occurrence_id: id }
      );
    } else {
      LogService.error({
        from: "OccurrencesService",
        message: "Failed to delete occurrence",
        http_method: "DELETE",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  return { GetAsync, GetByIdAsync, AddAsync, GetTypesAsync, DeleteAsync };
};
