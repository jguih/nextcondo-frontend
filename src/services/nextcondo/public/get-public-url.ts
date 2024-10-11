import "server-only";

import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { z } from "zod";
import { LogService } from "../../logger/server";
import { getLogMessageFromFetchClientResponse } from "../../logger/utils/get-fetch-client-response-message";

const publicUrlSchema = z.object({
  url: z.string(),
});

export const getNextCondoBackendPublicUrl = async (): Promise<string> => {
  const client = createFetchClient(getNextCondoBackendUrl());
  const result = await client.getAsync({
    endpoint: "Public/publicURL",
    strategy: new JsonStrategy(publicUrlSchema),
  });

  if (result.success && result.hasData) {
    LogService.info(
      {
        ...getLogMessageFromFetchClientResponse(result),
        from: "PublicService",
        message: "Fetched NextCondo Back-End public URL successfully",
      },
      { public_url: result.response.data.url }
    );
    return result.response.data.url;
  } else {
    LogService.error({
      ...getLogMessageFromFetchClientResponse(result),
      from: "PublicService",
      message: "Failed to fetch NextCondo Back-End public URL",
    });
  }

  throw new Error("Failed to get nextcondo backend public url");
};
