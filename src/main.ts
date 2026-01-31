import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module"; 
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

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
      "access-token"
    )
    .addCookieAuth("refresh_token")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  const availablePorts = [3002, 3003, 3004, 3005, 3006];
  const port = process.env.PORT || availablePorts[Math.floor(Math.random() * availablePorts.length)];

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger available on http://localhost:${port}/swagger`);
}

bootstrap();
