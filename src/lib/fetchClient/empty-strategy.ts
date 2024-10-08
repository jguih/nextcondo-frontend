import { problemDetailsSchema } from "./schemas/problem-details";
import { IFetchStrategy } from "./IFetchStrategy";
import { EmptyStrategyError } from "./empty-strategy-error";

export class EmptyStrategy implements IFetchStrategy {
  async handleAsync(response: Response) {
    const contentType = response.headers.get("content-type");
    const isProblemDetailsResponse =
      contentType?.includes("application/problem+json") ?? false;

    if (!response.ok && isProblemDetailsResponse) {
      const originalJson = await response.json();
      const result = await problemDetailsSchema.safeParseAsync(originalJson);
      if (result.success) {
        throw new EmptyStrategyError({
          message: "Request failed with Problem Details",
          statusCode: response.status,
          data: result.data,
        });
      }
      throw new EmptyStrategyError({
        message: "Request failed with invalid Problem Details response",
        statusCode: response.status,
      });
    }

    if (!response.ok) {
      throw new EmptyStrategyError({
        message: "Request failed and response body is not Problem Details",
        statusCode: response.status,
      });
    }

    // Response is Ok
    return undefined;
  }
}
