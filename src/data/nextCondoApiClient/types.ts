import { ZodSchema } from "zod";
import { ProblemDetails } from "../schemas/auth";

export type FetchNextCondoApiFnProps<Output extends object> =
  | ({
      endpoint: string;
      body: object | FormData;
      method: "POST" | "PUT";
      schema: ZodSchema<Output>;
    } & Omit<RequestInit, "body" | "method">)
  | ({
      endpoint: string;
      method: "GET";
      schema: ZodSchema<Output>;
      body?: undefined;
    } & Omit<RequestInit, "body" | "method">);

export type FetchNextCondoApiFnReturn<Output extends object> =
  | {
      success: true;
      data: Output;
      originalResponse: unknown;
      statusCode: number;
      error?: {
        message: string;
      };
    }
  | {
      success: false;
      data?: ProblemDetails;
      originalResponse?: unknown;
      statusCode: number;
      error: {
        message: string;
      };
    };

export class HttpResponseError extends Error {
  details?: ProblemDetails;
  response: unknown;
  statusCode: number;

  constructor(response: unknown, statusCode: number, details?: ProblemDetails) {
    super();
    this.details = details;
    this.response = response;
    this.statusCode = statusCode;
  }
}
