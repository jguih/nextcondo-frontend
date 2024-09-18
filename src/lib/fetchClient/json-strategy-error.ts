import { StrategyError, StrategyErrorProps } from "./StrategyError";

type JsonStrategyErrorProps = StrategyErrorProps;

export class JsonStrategyError extends StrategyError {
  constructor({ ...props }: JsonStrategyErrorProps) {
    super({ ...props });
  }
}
