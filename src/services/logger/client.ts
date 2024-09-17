import { ILogService } from "./ILogService";

class ClientLogService implements ILogService {
  error(...error: unknown[]) {
    console.error(`[${new Date().toUTCString()}]:`, ...error);
  }

  warn(...message: unknown[]) {
    console.warn(`[${new Date().toUTCString()}]:`, ...message);
  }

  info(...message: unknown[]) {
    console.info(`[${new Date().toUTCString()}]:`, ...message);
  }
}

export const LogService = new ClientLogService();
