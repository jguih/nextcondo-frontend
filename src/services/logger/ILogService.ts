export interface ILogService {
  error: (...error: unknown[]) => void;
  warn: (...message: unknown[]) => void;
  info: (...message: unknown[]) => void;
}
