import {
  HttpGetProps,
  HttpPostProps,
  FetchClientSuccessResponse,
  FetchClientFailedResponse,
} from "./types";
import { joinUrlAndEndpoint } from "../utils";
import { JsonStrategyError, StrategyError } from "./strategy.error";

const sendError = (error: unknown): FetchClientFailedResponse => {
  if (error instanceof JsonStrategyError) {
    return {
      success: false,
      response: {
        statusCode: error.statusCode,
        data: error.data,
      },
      error: {
        message: error.message,
      },
    };
  }
  if (error instanceof StrategyError) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
  if (error instanceof Error) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
  return {
    success: false,
    error: {
      message: "Fetch failed",
    },
  };
};

const httpGet = async <Output>(
  url: string,
  { endpoint, strategy, ...props }: HttpGetProps<Output>
): Promise<FetchClientSuccessResponse<Output> | FetchClientFailedResponse> => {
  try {
    const parsedUrl = joinUrlAndEndpoint(url, endpoint);
    const response = await fetch(parsedUrl, {
      ...props,
      method: "GET",
    });
    const result = await strategy.handleAsync(response);
    return {
      success: true,
      response: {
        data: result,
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error);
  }
};

const httpPost = async <Output>(
  url: string,
  { endpoint, strategy, body, ...props }: HttpPostProps<Output>
): Promise<FetchClientSuccessResponse<Output> | FetchClientFailedResponse> => {
  const parsedUrl = joinUrlAndEndpoint(url, endpoint);
  try {
    const response = await fetch(parsedUrl, {
      ...props,
      method: "POST",
      body,
    });
    const result = await strategy.handleAsync(response);
    return {
      success: true,
      response: {
        data: result,
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error);
  }
};

export const createFetchClient = (url: string) => {
  return {
    get: <Output>(props: HttpGetProps<Output>) => httpGet(url, { ...props }),
    post: <Output>(props: HttpPostProps<Output>) => httpPost(url, { ...props }),
  };
};
