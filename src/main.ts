import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new ConsoleLogger({
      json: false,
      logLevels: ["log", "fatal", "error", "warn", "debug"],
      colors: true,
      prefix: "systemLog",
      timestamp: true,
      compact: true,
      maxArrayLength: 100,
      maxStringLength: 10000,
      sorted: true,
      showHidden: true,
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("Authentication & Authorization APIs")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "access-token",
    )
    .addCookieAuth("refresh_token")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  const port = Number(process.env.PORT ?? 3002);

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger available on http://localhost:${port}/swagger`);
}

bootstrap();
