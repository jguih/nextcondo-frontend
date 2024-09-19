import { ILogger } from "./ILogger";
import { LogExtraFields, LogMessage } from "./types";

export class ConsoleLogger implements ILogger {
  format(message: LogMessage, extra?: LogExtraFields): string {
    return JSON.stringify({ ...message, ...extra }, null, 2);
  }
  handleError(message: LogMessage, extra?: LogExtraFields) {
    console.error(this.format(message, extra));
  }
  handleInfo(message: LogMessage, extra?: LogExtraFields): void {
    console.info(this.format(message, extra));
  }
  handleWarn(message: LogMessage, extra?: LogExtraFields): void {
    console.warn(this.format(message, extra));
  }
}
