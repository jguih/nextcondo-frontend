import { ProblemDetails } from "./schemas/auth";
import { IFetchStrategy } from "./IFetchStrategy";

type BaseHttpProps<Output> = {
  endpoint?: string;
  strategy: IFetchStrategy<Output>;
} & Omit<RequestInit, "method" | "body">;

export type HttpGetProps<Output> = BaseHttpProps<Output>;

export type HttpPostProps<Output> = BaseHttpProps<Output> & {
  body?: RequestInit["body"];
};

export type FetchClientSuccessResponse<Output> = {
  success: true;
  response: { statusCode: number };
} & (
  | {
      hasData: true;
      response: {
        data: Output;
      };
    }
  | {
      hasData: false;
      response: {
        data?: undefined;
      };
    }
);
export type FetchClientFailedResponse = {
  success: false;
  response?: {
    data?: ProblemDetails;
    statusCode: number;
  };
  error?: {
    message: string;
  };
};
export type FetchClientResponse<Output> =
  | FetchClientSuccessResponse<Output>
  | FetchClientFailedResponse;
