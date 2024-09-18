import { ZodSchema } from "zod";
import { problemDetailsSchema } from "./schemas/auth";
import { JsonStrategyError } from "./json-strategy-error";
import { IFetchStrategy } from "./IFetchStrategy";

export class JsonStrategy<Output> implements IFetchStrategy<Output> {
  schema: ZodSchema<Output>;

  constructor(schema: ZodSchema<Output>) {
    this.schema = schema;
  }

  async handleAsync(response: Response) {
    const contentType = response.headers.get("content-type");
    const isJsonResponse = contentType?.includes("application/json") ?? false;
    const isProblemDetailsResponse =
      contentType?.includes("application/problem+json") ?? false;
    const status = response.status;

    if (response.ok && status === 204) {
      return;
    }

    if (!isJsonResponse && !isProblemDetailsResponse) {
      throw new JsonStrategyError({
        message: "Response body is not JSON",
        statusCode: status,
      });
    }

    const originalJson = await response.json();

    if (!response.ok && isProblemDetailsResponse) {
      const result = await problemDetailsSchema.safeParseAsync(originalJson);
      if (result.success) {
        throw new JsonStrategyError({
          message: "Request failed with Problem Details",
          statusCode: status,
          data: result.data,
        });
      }
      throw new JsonStrategyError({
        message: "Request failed with invalid Problem Details response",
        statusCode: status,
      });
    }

    if (!response.ok) {
      throw new JsonStrategyError({
        message: "Request failed and response body is not Problems Details",
        statusCode: status,
      });
    }

    // Response is Ok and not 204
    const zodResult = await this.schema.safeParseAsync(originalJson);
    if (zodResult.success) {
      return zodResult.data;
    }

    throw new JsonStrategyError({
      message:
        "Request succeded, but response body failed to parse using schema",
      statusCode: status,
    });
  }
}
