import { LoggerService, Injectable } from "@nestjs/common";

@Injectable()
export class SystemLogService implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  private format(message: unknown, level: string, context?: string) {
    if (typeof message === "object" && message !== null) {
      return JSON.stringify({
        level,
        context,
        ...(message as Record<string, unknown>),
      });
    }

    return JSON.stringify({ level, context, message: String(message) });
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.log(this.format(message, "log", context));
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.error(this.format(message, "fatal", context));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.error(this.format(message, "error", context));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.warn(this.format(message, "warn", context));
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.debug(this.format(message, "debug", context));
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    const context = (optionalParams[0] as string) || this.context;
    console.log(this.format(message, "verbose", context));
  }
}
