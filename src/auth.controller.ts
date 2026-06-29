import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource } from 'typeorm'; // Asegúrate de importar el DataSource

@Controller('auth') // <--- Esto es lo que faltaba al principio
export class AuthController {
  
  constructor(private readonly dataSource: DataSource) {} // <--- Inyectar el DataSource

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    console.log(`Intento de login - Email: ${email}, Password: ${password}`);

    if (!email || !email.includes('@') || !password) {
      throw new HttpException('Campos incompletos', HttpStatus.BAD_REQUEST);
    }

    try {
      const users = await this.dataSource.query(
        'SELECT id, password FROM user WHERE email = ? LIMIT 1', 
        [email.trim()]
      );

      console.log('Usuarios encontrados en BD:', users);

      if (users.length > 0 && users[0].password.toString().trim() === password.toString().trim()) {
        return { success: true, userId: users[0].id };
      }
      
      console.log('Falló la comparación. BD tiene:', users[0]?.password, 'Input tiene:', password);
      throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
      
    } catch (e) {
      throw e;
    }
  }
}