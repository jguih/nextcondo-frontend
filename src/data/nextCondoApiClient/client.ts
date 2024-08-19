import {
  FetchNextCondoApiFnProps,
  FetchNextCondoApiFnReturn,
  HttpResponseError,
} from "./types";
import { problemDetailsSchema } from "../schemas/auth";

export const joinUrlAndEndpoint = (apiUrl: string, endpoint: string) => {
  const parsedEndpoint = endpoint.startsWith("/")
    ? endpoint.substring(1, endpoint.length)
    : endpoint;
  const parsedApiUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
  return `${parsedApiUrl}${parsedEndpoint}`;
};

export const fetchNextCondoApi = async <Output extends object>(
  apiUrl: string,
  {
    endpoint,
    schema,
    body,
    method,
    ...reqProps
  }: FetchNextCondoApiFnProps<Output>
): Promise<FetchNextCondoApiFnReturn<Output>> => {
  try {
    const response = await fetch(joinUrlAndEndpoint(apiUrl, endpoint), {
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
