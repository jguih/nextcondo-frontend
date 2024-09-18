import { createFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { schemas } from "./schemas";
import { LogService } from "../../logger/client";
import { EmptyStrategy } from "@/src/lib/fetchClient/empty-strategy";

type useCondominiumService = {
  nextcondoBackendPublicUrl: string;
};

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
      LogService.info("Condominium created\n", result.response);
    } else {
      LogService.error("Failed to create condominium\n", result);
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
      LogService.info("Fetched condominium for current user\n", result);
    } else {
      LogService.error(
        "Failed to fetch condominium for current user\n",
        result
      );
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
          "Fetched current condominium for current user\n",
          result
        );
      } else {
        LogService.error(
          "Failed to fetch current condominium for current user\n",
          result
        );
      }
      return result;
    };

  return { AddAsync, GetMineAsync, GetMineCurrentAsync };
};
