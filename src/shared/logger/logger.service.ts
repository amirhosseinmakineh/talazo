// src/shared/logger/logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class SystemLogService implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.log(`[LOG] ${context ? `[${context}]` : ''}`, message);
  }

  fatal(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.error(`[FATAL] ${context ? `[${context}]` : ''}`, message);
  }

  error(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.error(`[ERROR] ${context ? `[${context}]` : ''}`, message);
  }

  warn(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.warn(`[WARN] ${context ? `[${context}]` : ''}`, message);
  }

  debug(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.debug(`[DEBUG] ${context ? `[${context}]` : ''}`, message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] || this.context;
    console.log(`[VERBOSE] ${context ? `[${context}]` : ''}`, message);
  }
}