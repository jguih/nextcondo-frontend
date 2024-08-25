import { ProblemDetails } from "../schemas/auth";
import { FetchStrategy } from "./strategy";

type BaseHttpProps<Output> = {
  endpoint?: string;
  strategy: FetchStrategy<Output>;
} & Omit<RequestInit, "method" | "body">;

export type HttpGetProps<Output> = BaseHttpProps<Output>;

export type HttpPostProps<Output> = BaseHttpProps<Output> & {
  body?: RequestInit["body"];
};

export type FetchClientSuccessResponse<Output> = {
  success: true;
  response: {
    data: Output;
    statusCode: number;
  };
};
export type FetchClientFailedResponse = {
  success: false;
  response?: {
    data?: ProblemDetails;
    statusCode: number;
  };
};
export type FetchClientResponse<Output> =
  | FetchClientSuccessResponse<Output>
  | FetchClientFailedResponse;
