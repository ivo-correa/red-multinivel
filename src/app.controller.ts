import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth') // Esto define que la ruta base es /auth
export class AppController {
  
  @Post('login') // Esto crea /auth/login
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) {
    console.log("Login recibido desde Flutter:", body);
    // Aquí es donde en el futuro validarás el email/password en tu DB
    return { 
      success: true, 
      message: "Autenticación exitosa" 
    };
  }
}