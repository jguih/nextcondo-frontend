import { ProblemDetails } from "@/src/lib/fetchClient/schemas/auth";

export type LogExtraFields = Record<
  string,
  string | number | object | boolean | undefined
>;

type LogServices =
  | "AuthService"
  | "CondominiumService"
  | "UsersService"
  | "PublicService"
  | "";

export type LogMessage = {
  level: "error" | "warn" | "info";
  timestamp: string;
  message: string;
  from: LogServices;
  error?: {
    message?: string;
  };
  problem_details?: ProblemDetails;
  status_code?: number;
  fetch_url?: string;
};

export type LogMessageCommand = Omit<LogMessage, "level" | "timestamp">;
