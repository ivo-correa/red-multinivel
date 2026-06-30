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
    
    const port = process.env.PORT || 3000;
    
    // Escuchar en todas las interfaces de red
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Application is running on port: ${port}`);
  } catch (error) {
    // Esto es vital: si falla la base de datos, lo veremos en los logs de Render
    console.error('Error crítico durante el inicio de la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();