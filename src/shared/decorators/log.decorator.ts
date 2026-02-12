import { SetMetadata } from "@nestjs/common";

export const LOG_KEY = "log";
export const LogMethod = () => SetMetadata(LOG_KEY, true);
