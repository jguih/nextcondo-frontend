import {
  HttpGetProps,
  HttpPostProps,
  FetchClientFailedResponse,
  FetchClientResponse,
  HttpDeleteProps,
  HttpPutProps,
} from "./types";
import { errorHasMessage, joinUrlAndEndpoint } from "./utils";
import { StrategyError } from "./StrategyError";

const sendError = (
  error: unknown,
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string
): FetchClientFailedResponse => {
  if (error instanceof StrategyError) {
    return {
      success: false,
      url,
      method,
      response: {
        statusCode: error.statusCode,
        data: error.data,
      },
      error: {
        message: error.message,
      },
    };
  }
  if (error instanceof TypeError) {
    return {
      success: false,
      url,
      method,
      error: {
        message: error.message,
      },
    };
  }
  if (error instanceof Error) {
    return {
      success: false,
      url,
      method,
      error: {
        message: error.message,
      },
    };
  }
  return {
    success: false,
    url,
    method,
    error: {
      message: errorHasMessage(error) ? error.message : "unknown fetch error",
    },
  };
};

const httpGetAsync = async <Output>(
  url: string,
  { endpoint, strategy, ...props }: HttpGetProps<Output>
): Promise<FetchClientResponse<Output>> => {
  const parsedUrl = joinUrlAndEndpoint(url, endpoint);
  try {
    const response = await fetch(parsedUrl, {
      ...props,
      method: "GET",
    });
    const result = await strategy.handleAsync(response);
    if (result) {
      return {
        url: parsedUrl,
        method: "GET",
        success: true,
        hasData: true,
        response: {
          data: result,
          statusCode: response.status,
        },
      };
    }
    return {
      url: parsedUrl,
      method: "GET",
      success: true,
      hasData: false,
      response: {
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error, "GET", parsedUrl);
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
    if (result) {
      return {
        url: parsedUrl,
        method: "POST",
        success: true,
        hasData: true,
        response: {
          data: result,
          statusCode: response.status,
        },
      };
    }
    return {
      url: parsedUrl,
      method: "POST",
      success: true,
      hasData: false,
      response: {
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error, "POST", parsedUrl);
  }
};

const httpDeleteAsync = async <Output>(
  url: string,
  { endpoint, strategy, ...props }: HttpDeleteProps<Output>
): Promise<FetchClientResponse<Output>> => {
  const parsedUrl = joinUrlAndEndpoint(url, endpoint);
  try {
    const response = await fetch(parsedUrl, {
      ...props,
      method: "DELETE",
    });
    const result = await strategy.handleAsync(response);
    if (result) {
      return {
        url: parsedUrl,
        method: "DELETE",
        success: true,
        hasData: true,
        response: {
          data: result,
          statusCode: response.status,
        },
      };
    }
    return {
      url: parsedUrl,
      method: "DELETE",
      success: true,
      hasData: false,
      response: {
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error, "DELETE", parsedUrl);
  }
};

const httpPutAsync = async <Output>(
  url: string,
  { strategy, endpoint, body, ...props }: HttpPutProps<Output>
): Promise<FetchClientResponse<Output>> => {
  const parsedUrl = joinUrlAndEndpoint(url, endpoint);
  try {
    const response = await fetch(parsedUrl, {
      ...props,
      method: "PUT",
      body: body,
    });
    const result = await strategy.handleAsync(response);
    if (result) {
      return {
        url: parsedUrl,
        method: "PUT",
        success: true,
        hasData: true,
        response: {
          data: result,
          statusCode: response.status,
        },
      };
    }
    return {
      url: parsedUrl,
      method: "PUT",
      success: true,
      hasData: false,
      response: {
        statusCode: response.status,
      },
    };
  } catch (error) {
    return sendError(error, "PUT", parsedUrl);
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
  /**
   * Handles DELETE requests.
   * @param endpoint (optional) The endpoint to be fetched.
   * @param strategy Response body parser strategy.
   * @returns `Output` as defined by the chosen strategy.
   */
  deleteAsync: <Output>(
    props: HttpDeleteProps<Output>
  ) => Promise<FetchClientResponse<Output>>;
  /**
   * Handles PUT requests.
   * @param endpoint (optional) The endpoint to be fetched.
   * @param strategy Response body parser strategy.
   * @param body (optional) Request body.
   * @returns `Output` as defined by the chosen strategy.
   */
  putAsync: <Output>(
    props: HttpPutProps<Output>
  ) => Promise<FetchClientResponse<Output>>;
}

export const createFetchClient = (url: string): IFetchClient => {
  return {
    getAsync: (props) => httpGetAsync(url, { ...props }),
    postAsync: (props) => httpPostAsync(url, { ...props }),
    deleteAsync: (props) => httpDeleteAsync(url, { ...props }),
    putAsync: (props) => httpPutAsync(url, { ...props }),
  };
};
