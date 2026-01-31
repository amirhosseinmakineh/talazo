"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.enableShutdownHooks();
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Auth API")
        .setDescription("Authentication & Authorization APIs")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
    }, "access-token")
        .addCookieAuth("refresh_token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("swagger", app, document);
    const availablePorts = [3002, 3003, 3004, 3005, 3006];
    const port = process.env.PORT || availablePorts[Math.floor(Math.random() * availablePorts.length)];
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger available on http://localhost:${port}/swagger`);
}
bootstrap();
//# sourceMappingURL=main.js.map