import "server-only";

import { ILogService } from "./ILogService";
import { LogExtraFields, LogMessage, LogMessageCommand } from "./types";
import { ILogger } from "./ILogger";
import { ConsoleLogger } from "./console-logger";
import { getCurrentTimeStamp } from "./utils/get-current-timestamp";

class ServerLogService implements ILogService {
  logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  error(command: LogMessageCommand, extra?: LogExtraFields) {
    const message: LogMessage = {
      level: "error",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleError(message, extra);
  }

  warn(command: LogMessageCommand, extra?: LogExtraFields) {
    const message: LogMessage = {
      level: "warn",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleWarn(message, extra);
  }

  info(command: LogMessageCommand, extra?: LogExtraFields) {
    const message: LogMessage = {
      level: "info",
      timestamp: getCurrentTimeStamp(),
      ...command,
    };
    this.logger.handleInfo(message, extra);
  }
}

export const LogService = new ServerLogService(new ConsoleLogger());
