import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { LogMessageCommand } from "../types";

export const getLogMessageFromFetchClientResponse = <Output>(
  result: FetchClientResponse<Output>
): Partial<LogMessageCommand> => {
  if (result.success) {
    return {
      http_method: result.method,
      fetch_url: result.url,
      status_code: result.response?.statusCode,
    };
  }
  return {
    http_method: result.method,
    fetch_url: result.url,
    status_code: result.response?.statusCode,
    error: { message: result.error?.message },
    problem_details: result.response?.data,
  };
};
