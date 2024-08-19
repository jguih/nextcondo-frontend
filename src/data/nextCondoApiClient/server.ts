import "server-only";
import {
  FetchNextCondoApiFnProps,
  FetchNextCondoApiFnReturn,
  HttpResponseError,
} from "./types";
import { problemDetailsSchema } from "../schemas/auth";

const parseNextCondoApiAddress = (endpoint: string) => {
  const api = process.env.NEXTCONDOAPI_URL;
  if (!api) {
    throw new Error("NEXTCONDOAPI_URL env empty, check .env vars");
  }
  return `${api}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export const fetchNextCondoApi = async <Output extends object>({
  endpoint,
  schema,
  body,
  method,
  ...reqProps
}: FetchNextCondoApiFnProps<Output>): Promise<
  FetchNextCondoApiFnReturn<Output>
> => {
  const url = parseNextCondoApiAddress(endpoint);
  try {
    const response = await fetch(url, {
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
        data: error.details,
        statusCode: error.statusCode,
        error: {
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
