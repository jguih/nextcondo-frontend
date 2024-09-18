import "server-only";

import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { z } from "zod";

const publicUrlSchema = z.object({
  url: z.string(),
});

export const getNextCondoBackendPublicUrl = async (): Promise<string> => {
  const client = createFetchClient(getNextCondoBackendUrl());
  const publicUrl = await client.getAsync({
    endpoint: "Public/publicURL",
    strategy: new JsonStrategy(publicUrlSchema),
  });
  if (publicUrl.success && publicUrl.hasData) {
    return publicUrl.response.data.url;
  }
  throw new Error("Failed to get nextcondo backend public url");
};
