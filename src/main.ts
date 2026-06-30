import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  // Esto obliga a que cualquier petición mal formada sea rechazada automáticamente
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true, 
    whitelist: true,
    forbidNonWhitelisted: true 
  }));
  
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();