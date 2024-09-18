import { StrategyError, StrategyErrorProps } from "./StrategyError";

type EmptyStrategyErrorProps = StrategyErrorProps;

export class EmptyStrategyError extends StrategyError {
  constructor({ ...props }: EmptyStrategyErrorProps) {
    super({ ...props });
  }
}
