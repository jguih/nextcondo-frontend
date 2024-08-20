import "server-only";
import {
  FetchNextCondoApiFnProps,
  FetchNextCondoApiFnReturn,
  HttpResponseError,
} from "./types";
import { problemDetailsSchema } from "../schemas/auth";
import { joinUrlAndEndpoint } from "../utils";

export const fetchNextCondoApi = async <Output extends object>(
  url: string,
  {
    endpoint,
    schema,
    body,
    method,
    ...reqProps
  }: FetchNextCondoApiFnProps<Output>
): Promise<FetchNextCondoApiFnReturn<Output>> => {
  const joinedUrl = joinUrlAndEndpoint(url, endpoint);
  try {
    const response = await fetch(joinedUrl, {
      body: body && (body instanceof FormData ? body : JSON.stringify(body)),
      method,
      ...reqProps,
    });

    const originalJson = await response.json();

    if (!response.ok) {
      const result = await problemDetailsSchema.safeParseAsync(originalJson);
      if (result.success) {
        throw new HttpResponseError(originalJson, response.status, result.data);
      }
      throw new HttpResponseError(originalJson, response.status);
    }

    const zodResult = await schema.safeParseAsync(originalJson);
    if (!zodResult.success) {
      return {
        success: false,
        originalResponse: originalJson,
        statusCode: response.status,
        error: {
          message: "Zod error",
        },
      };
    }

    return {
      success: true,
      data: zodResult.data,
      originalResponse: originalJson,
      statusCode: response.status,
    };
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return {
        success: false,
        originalResponse: error.response,
        statusCode: error.statusCode,
        error: {
          details: error.details,
          message: error.details?.detail ?? "Fetch failed",
        },
      };
    }
    return {
      success: false,
      statusCode: 500,
      error: {
        message: "Server not available",
      },
    };
  }
};
