"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        }));
        const port = process.env.PORT || 3000;
        await app.listen(port, '0.0.0.0');
        logger.log(`Application is running on port: ${port}`);
    }
    catch (error) {
        logger.error('Error al iniciar, revisa la conexión a la base de datos:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map