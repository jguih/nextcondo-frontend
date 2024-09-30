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

export type HttpDeleteProps<Output> = BaseHttpProps<Output>;

type BaseResponse = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
};

export type FetchClientSuccessResponse<Output> = BaseResponse &
  (
    | {
        success: true;
        hasData: true;
        response: {
          data: Output;
          statusCode: number;
        };
      }
    | {
        success: true;
        hasData: false;
        response: {
          data?: undefined;
          statusCode: number;
        };
      }
  );

export type FetchClientFailedResponse = BaseResponse & {
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
