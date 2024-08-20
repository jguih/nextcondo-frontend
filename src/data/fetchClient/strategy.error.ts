import { ProblemDetails } from "../schemas/auth";

type StrategyErrorProps = {
  message: string;
  statusCode: number;
};

export class StrategyError extends Error {
  statusCode: number;

  constructor({ statusCode, message }: StrategyErrorProps) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

type JsonStrategyErrorProps = StrategyErrorProps & {
  data?: ProblemDetails;
};

export class JsonStrategyError extends StrategyError {
  data?: ProblemDetails;

  constructor({ data, ...baseProps }: JsonStrategyErrorProps) {
    super({ ...baseProps });
    this.data = data;
  }
}
