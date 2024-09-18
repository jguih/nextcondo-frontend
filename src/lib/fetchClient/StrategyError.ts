import { ProblemDetails } from "./schemas/auth";

export type StrategyErrorProps = {
  message: string;
  statusCode: number;
  data?: ProblemDetails;
};

export class StrategyError extends Error {
  statusCode: number;
  data?: ProblemDetails;

  constructor({ statusCode, message, data }: StrategyErrorProps) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
