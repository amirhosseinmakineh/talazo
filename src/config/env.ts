import { registerAs } from "@nestjs/config";

const requireEnv = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
};

const parseNumber = (value: string, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeNodeEnv = (
  value?: string,
): "development" | "production" | "test" => {
  if (value === "production" || value === "test") {
    return value;
  }

  return "development";
};

export const appConfig = registerAs("app", () => {
  const nodeEnv = normalizeNodeEnv(process.env.NODE_ENV);

  return {
    nodeEnv,
    port: parseNumber(process.env.PORT ?? "3002", 3002),
    isProduction: nodeEnv === "production",
  };
});

export const databaseConfig = registerAs("database", () => ({
  type: "postgres" as const,
  host: requireEnv("DB_HOST", "127.0.0.1"),
  port: parseNumber(process.env.DB_PORT ?? "5432", 5432),
  username: requireEnv("DB_USERNAME", "postgres"),
  password: process.env.DB_PASSWORD ?? "",
  database: requireEnv("DB_NAME", "talazo"),
  synchronize: (process.env.DB_SYNCHRONIZE ?? "false") === "true",
}));

export const authConfig = registerAs("auth", () => ({
  accessTokenSecret: requireEnv("JWT_ACCESS_SECRET"),
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
  refreshTokenSecret: requireEnv("JWT_REFRESH_SECRET"),
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
}));
