import { SafeParseReturnType } from "zod";
import { HttpGetProps, HttpPostProps, JsonFetchClientResponse } from "./types";
import { problemDetailsSchema } from "../schemas/auth";
import { joinUrlAndEndpoint } from "../utils";

const sendError = <Output>(
  error: unknown,
  status: number
): JsonFetchClientResponse<Output> => {
  if (error instanceof Error) {
    return {
      success: false,
      statusCode: status,
      error: {
        message: error.message,
      },
    };
  }
  return {
    success: false,
    statusCode: status,
    error: {
      message: "Fetch failed",
    },
  };
};

const sendResponseErrorAsync = async <Output>(
  originalJson: unknown,
  status: number
): Promise<JsonFetchClientResponse<Output>> => {
  const result = await problemDetailsSchema.safeParseAsync(originalJson);
  if (result.success) {
    return {
      success: false,
      statusCode: status,
      error: {
        details: result.data,
        message: result.data.detail,
      },
    };
  }
  return {
    success: false,
    statusCode: status,
    error: {
      details: result.data,
      message: "Fetch failed",
    },
  };
};

const sendZodResult = <Output>(
  zodResult: SafeParseReturnType<Output, Output>,
  status: number
): JsonFetchClientResponse<Output> => {
  if (!zodResult.success) {
    return {
      success: false,
      statusCode: status,
      error: {
        message: "Zod error",
      },
    };
  }

  return {
    success: true,
    statusCode: status,
    data: zodResult.data,
  };
};

const httpGet = async <Output>(
  url: string,
  { endpoint, schema, ...props }: HttpGetProps<Output>
): Promise<JsonFetchClientResponse<Output>> => {
  let status: number = 500;
  try {
    const parsedUrl = joinUrlAndEndpoint(url, endpoint);
    const response = await fetch(parsedUrl, {
      ...props,
      method: "GET",
    });
    const originalJson = await response.json();
    status = response.status;
    if (!response.ok) {
      return await sendResponseErrorAsync(originalJson, status);
    }
    const zodResult = await schema.safeParseAsync(originalJson);
    return sendZodResult(zodResult, status);
  } catch (error) {
    return sendError(error, status);
  }
};

const httpPost = async <Output>(
  url: string,
  { endpoint, schema, body, ...props }: HttpPostProps<Output>
): Promise<JsonFetchClientResponse<Output>> => {
  let status: number = 500;
  try {
    const parsedUrl = joinUrlAndEndpoint(url, endpoint);
    const parsedBody =
      body && (body instanceof FormData ? body : JSON.stringify(body));
    const response = await fetch(parsedUrl, {
      ...props,
      method: "POST",
      body: parsedBody,
    });
    const originalJson = await response.json();
    status = response.status;
    if (!response.ok) {
      return sendResponseErrorAsync(originalJson, status);
    }
    const zodResult = await schema.safeParseAsync(originalJson);
    return sendZodResult(zodResult, status);
  } catch (error) {
    return sendError(error, status);
  }
};

export const createJsonFetchClient = (url: string) => {
  return {
    get: <Output>(props: HttpGetProps<Output>) => httpGet(url, { ...props }),
    post: <Output>(props: HttpPostProps<Output>) => httpPost(url, { ...props }),
  };
};
