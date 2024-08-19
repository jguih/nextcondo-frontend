import "server-only";
import {
  FetchNextCondoApiFnProps,
  FetchNextCondoApiFnReturn,
  HttpResponseError,
} from "./utils.types";
import { problemDetailsSchema } from "./schemas/auth";

export const parseNextCondoApiAddress = (endpoint: string) => {
  if (!process.env.NEXTCONDO_API) {
    throw new Error("NEXTCONDO_API env empty, check .env vars");
  }
  return `${process.env.NEXTCONDO_API}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export const fetchNextCondoApi = async <Output extends object>({
  endpoint,
  schema,
  ...reqProps
}: FetchNextCondoApiFnProps<Output>): Promise<
  FetchNextCondoApiFnReturn<Output>
> => {
  try {
    const response = await fetch(parseNextCondoApiAddress(endpoint), {
      ...reqProps,
    });

    const raw = await response.json();

    if (!response.ok) {
      const result = await problemDetailsSchema.safeParseAsync(raw);
      if (result.success) {
        throw new HttpResponseError(response, result.data);
      }
      throw new HttpResponseError(response);
    }

    const zodResult = await schema.safeParseAsync(raw);
    if (!zodResult.success) {
      return {
        success: false,
        response: response,
        error: {
          message: "Zod error",
        },
      };
    }

    return {
      success: true,
      data: zodResult.data,
      response: response,
    };
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return {
        success: false,
        response: error.response,
        error: {
          message: error.details?.detail ?? "Fetch failed",
        },
      };
    }
    return {
      success: false,
      error: {
        message: "Fetch failed",
      },
    };
  }
};

export const sendResponse = async (response: Response) => {
  return await response.json();
};
