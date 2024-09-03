export type StrategyErrorProps = {
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
