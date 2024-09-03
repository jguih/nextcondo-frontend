import { ProblemDetails } from "./schemas/auth";
import { StrategyError, StrategyErrorProps } from "./StrategyError";

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
