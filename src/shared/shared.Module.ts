import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/loggingInterceptor';
import { SystemLogService } from './logger/logger.service';
import { DateService } from '../../utilities/dateService';
@Global()
@Module({
  providers: [
    SystemLogService,
    DateService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [
    SystemLogService,
  ],
})
export class SharedModule {}
