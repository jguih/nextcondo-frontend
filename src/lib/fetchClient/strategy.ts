import { ZodSchema } from "zod";
import { problemDetailsSchema } from "./schemas/auth";
import { JsonStrategyError } from "./strategy.error";

export interface FetchStrategy<Output> {
  handleAsync: (response: Response) => Promise<Output>;
}

export class JsonStrategy<Output> implements FetchStrategy<Output> {
  schema: ZodSchema<Output>;

  constructor(schema: ZodSchema<Output>) {
    this.schema = schema;
  }

  async handleAsync(response: Response) {
    const contentType = response.headers.get("content-type");
    const isJsonResponse = contentType?.includes("application/json") ?? false;
    const isProblemDetailsResponse =
      contentType?.includes("application/problem+json") ?? false;

    if (!isJsonResponse && !isProblemDetailsResponse) {
      throw new JsonStrategyError({
        message: "Response body is not a valid JSON",
        statusCode: 500,
      });
    }

    const originalJson = await response.json();

    if (!response.ok && isProblemDetailsResponse) {
      const result = await problemDetailsSchema.safeParseAsync(originalJson);
      if (result.success) {
        throw new JsonStrategyError({
          message: "Response is Problem Details",
          statusCode: response.status,
          data: result.data,
        });
      }
      throw new JsonStrategyError({
        message: "Failed to parse Problem Details on response body",
        statusCode: response.status,
      });
    }

    if (!response.ok) {
      throw new JsonStrategyError({
        message: "Request failed and response body could not be parsed",
        statusCode: response.status,
      });
    }

    // Response is Ok
    const zodResult = await this.schema.safeParseAsync(originalJson);
    if (zodResult.success) {
      return zodResult.data;
    }

    throw new JsonStrategyError({
      message:
        "Request succeded, but response body failed to parse using schema",
      statusCode: 500,
    });
  }
}
