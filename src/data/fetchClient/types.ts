import { ZodSchema } from "zod";
import { ProblemDetails } from "../schemas/auth";

type BaseHttpProps<Output> = {
  endpoint?: string;
  schema: ZodSchema<Output>;
} & Omit<RequestInit, "method" | "body">;

export type HttpGetProps<Output> = BaseHttpProps<Output>;

export type HttpPostProps<Output> = BaseHttpProps<Output> & {
  body?: object | FormData;
};

export type JsonFetchClientResponse<Output> = { statusCode: number } & (
  | {
      success: true;
      data: Output;
    }
  | {
      success: false;
      data?: undefined;
      error: {
        message: string;
        details?: ProblemDetails;
      };
    }
);
