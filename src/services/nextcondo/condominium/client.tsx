import { createFetchClient } from "@/src/lib/fetchClient/client";
import { ICondominiumService } from "./ICondominiumService";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { schemas } from "./schemas";
import { LogService } from "../../logger/client";

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
      strategy: new JsonStrategy(schemas.addCondominiumResponse),
      credentials: "include",
      body: data,
    });
    if (result.success) {
      LogService.info("New Condominium Created", result.response);
    }
    return result.success;
  };

  const GetMineAsync: ICondominiumService["GetMineAsync"] = async () => {
    return await client.getAsync({
      endpoint: "/Condominium/mine",
      strategy: new JsonStrategy(schemas.getMineCondominiumResponse),
      credentials: "include",
    });
  };

  return { AddAsync, GetMineAsync };
};
