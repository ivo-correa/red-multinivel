import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors();
    
    app.useGlobalPipes(new ValidationPipe({ 
      transform: true, 
      whitelist: true,
      forbidNonWhitelisted: true 
    }));
    
    // Render inyecta dinámicamente el puerto
    const port = process.env.PORT || 3000;
    
    // Escuchar en 0.0.0.0 es OBLIGATORIO en Render
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Application is running on port: ${port}`);
  } catch (error) {
    // Si falla la conexión a BD, NO hagas process.exit(1)
    // Dejamos que la app siga viva para que Render pueda escanear el puerto
    logger.error('Error al iniciar, revisa la conexión a la base de datos:', error);
  }
}

bootstrap();