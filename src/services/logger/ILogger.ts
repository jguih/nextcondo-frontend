import { LogExtraFields, LogMessage } from "./types";

type HandleFn = (message: LogMessage, extra?: LogExtraFields) => void;

export interface ILogger {
  handleError: HandleFn;
  handleInfo: HandleFn;
  handleWarn: HandleFn;
}
