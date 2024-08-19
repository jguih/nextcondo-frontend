import { ZodSchema } from "zod";
import { ProblemDetails } from "./schemas/auth";

export type FetchNextCondoApiFnProps<Output extends object> = {
  endpoint: string;
  schema: ZodSchema<Output>;
} & RequestInit;

export type FetchNextCondoApiFnReturn<Output extends object> =
  | {
      success: true;
      data: Output;
      response: Response;
    }
  | {
      success: false;
      response?: Response;
      error: {
        message: string;
      };
    };

export class HttpResponseError extends Error {
  details?: ProblemDetails;
  response: Response;

  constructor(response: Response, details?: ProblemDetails) {
    super();
    this.details = details;
    this.response = response;
  }
}
