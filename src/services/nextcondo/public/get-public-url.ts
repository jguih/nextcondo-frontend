import "server-only";

import { getNextCondoBackendUrl } from "@/src/lib/environment/get-backend-url";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { z } from "zod";
import { LogService } from "../../logger/server";

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
        from: "PublicService",
        message: "Fetched NextCondo Back-End public URL successfully",
        fetch_url: result.url,
        status_code: result.response?.statusCode,
      },
      { public_url: result.response.data.url }
    );
    return result.response.data.url;
  } else if (!result.success) {
    LogService.error({
      from: "PublicService",
      message: "Failed to fetch NextCondo Back-End public URL",
      fetch_url: result.url,
      status_code: result.response?.statusCode,
      error: { message: result.error?.message },
      problem_details: result.response?.data,
    });
  }

  throw new Error("Failed to get nextcondo backend public url");
};
