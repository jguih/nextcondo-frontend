import { LogExtraFields, LogMessageCommand } from "./types";

export interface ILogService {
  error: (message: LogMessageCommand, extra?: LogExtraFields) => void;
  warn: (message: LogMessageCommand, extra?: LogExtraFields) => void;
  info: (message: LogMessageCommand, extra?: LogExtraFields) => void;
}
