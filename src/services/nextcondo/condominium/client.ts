import { createFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { schemas } from "./schemas";
import { LogService } from "../../logger/client";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

type useCondominiumService = {
  nextcondoBackendPublicUrl: string;
};

const service = "CondominiumService";

/**
 * Client side implementation of `ICondominiumService`.
 */
export const useCondominiumService = ({
  nextcondoBackendPublicUrl,
}: useCondominiumService): ICondominiumService => {
  const client = createFetchClient(nextcondoBackendPublicUrl);

  const AddAsync: ICondominiumService["AddAsync"] = async (data) => {
    const result = await client.postAsync({
      endpoint: "/Condominium",
      strategy: new EmptyStrategy(),
      credentials: "include",
      body: data,
    });
    if (result.success) {
      LogService.info({
        from: service,
        message: "New condominium added successfully",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      });
    } else {
      LogService.error({
        from: service,
        message: "Failed to add new condominium",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result.success;
  };

  const GetMineAsync: ICondominiumService["GetMineAsync"] = async () => {
    const result = await client.getAsync({
      endpoint: "/Condominium/mine",
      strategy: new JsonStrategy(schemas.getMineResponse),
      credentials: "include",
    });
    if (result.success) {
      LogService.info(
        {
          from: service,
          message: "Fetched condominium list for current user",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
        },
        { condominium_id_list: result.response.data?.map((c) => c.id) }
      );
    } else {
      LogService.error({
        from: service,
        message: "Failed to fetch condominium list for current user",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
        error: { message: result.error?.message },
        problem_details: result.response?.data,
      });
    }
    return result;
  };

  const GetMineCurrentAsync: ICondominiumService["GetMineCurrentAsync"] =
    async () => {
      const result = await client.getAsync({
        endpoint: "/Condominium/mine/current",
        credentials: "include",
        strategy: new JsonStrategy(schemas.getMineCurrentReponse),
      });
      if (result.success) {
        LogService.info(
          {
            from: service,
            message: "Fetched current condominium for current user",
            fetch_url: result.url,
            status_code: result.response?.statusCode,
          },
          { condominium_id: result.response.data?.id }
        );
      } else {
        LogService.error({
          from: service,
          message: "Failed to fetch current condominium for current user",
          fetch_url: result.url,
          status_code: result.response?.statusCode,
          error: { message: result.error?.message },
          problem_details: result.response?.data,
        });
      }
      return result;
    };

  return { AddAsync, GetMineAsync, GetMineCurrentAsync };
};
