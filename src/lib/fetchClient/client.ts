import {
  HttpGetProps,
  HttpPostProps,
  FetchClientFailedResponse,
  FetchClientResponse,
} from "./types";
import { JsonStrategyError } from "./json-strategy-error";
import { joinUrlAndEndpoint } from "./utils";
import { StrategyError } from "./StrategyError";

const sendError = (error: unknown): FetchClientFailedResponse => {
  if (error instanceof JsonStrategyError) {
    return {
      success: false,
      response: {
        statusCode: error.statusCode,
        data: error.data,
      },
    };
  }
  if (error instanceof StrategyError) {
    return {
      success: false,
      response: {
        statusCode: error.statusCode,
      },
    };
  }
  if (error instanceof Error) {
    return {
      success: false,
    };
  }
  return {
    success: false,
  };
};

const httpGetAsync = async <Output>(
  url: string,
  { endpoint, strategy, ...props }: HttpGetProps<Output>
): Promise<FetchClientResponse<Output>> => {
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

const httpPostAsync = async <Output>(
  url: string,
  { endpoint, strategy, body, ...props }: HttpPostProps<Output>
): Promise<FetchClientResponse<Output>> => {
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

/**
 * Client that handles HTTP requests.
 * It works as a fetch wrapper.
 */
export interface IFetchClient {
  /**
   * Handles GET requests.
   * @param endpoint (optional) The endpoint to be fetched.
   * @param strategy Response body parser strategy.
   * @returns `Output` as defined by the chosen strategy.
   */
  getAsync: <Output>(
    props: HttpGetProps<Output>
  ) => Promise<FetchClientResponse<Output>>;
  /**
   * Handles POST requests.
   * @param endpoint (optional) The endpoint to be fetched.
   * @param strategy Response body parser strategy.
   * @param body (optional) Request body.
   * @returns `Output` as defined by the chosen strategy.
   */
  postAsync: <Output>(
    props: HttpPostProps<Output>
  ) => Promise<FetchClientResponse<Output>>;
}

export const createFetchClient = (url: string): IFetchClient => {
  return {
    getAsync: (props) => httpGetAsync(url, { ...props }),
    postAsync: (props) => httpPostAsync(url, { ...props }),
  };
};
