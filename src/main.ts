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
    
    // Escuchar en todas las interfaces de red (0.0.0.0) es obligatorio en Render
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Application is running on port: ${port}`);
  } catch (error) {
    logger.error('Error crítico durante el inicio de la aplicación:', error);
    // En producción, si la base de datos falla al arrancar, 
    // el proceso debe terminar para que Render lo intente de nuevo.
    process.exit(1);
  }
}

bootstrap();