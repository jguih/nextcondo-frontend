import { ILogger } from "./ILogger";
import { ILogService } from "./ILogService";
import { ConsoleLogger } from "./console-logger";
import { LogExtraFields, LogMessage, LogMessageCommand } from "./types";
import { getCurrentTimeStamp } from "./utils/get-current-timestamp";

class ClientLogService implements ILogService {
  logger: ILogger;
  shouldLog: boolean;

  constructor(logger: ILogger) {
    this.logger = logger;
    this.shouldLog = process.env.NODE_ENV === "development";
  }

  error(command: LogMessageCommand, extra?: LogExtraFields) {
    if (!this.shouldLog) return;
    const message: LogMessage = {
      level: "error",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleError(message, extra);
  }

  warn(command: LogMessageCommand, extra?: LogExtraFields) {
    if (!this.shouldLog) return;
    const message: LogMessage = {
      level: "warn",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleWarn(message, extra);
  }

  info(command: LogMessageCommand, extra?: LogExtraFields) {
    if (!this.shouldLog) return;
    const message: LogMessage = {
      level: "info",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleInfo(message, extra);
  }
}

export const LogService = new ClientLogService(new ConsoleLogger());
