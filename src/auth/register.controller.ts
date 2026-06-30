import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class RegisterController {
  // Ahora inyectamos el servicio, NO el repositorio
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { 
      nombre, 
      email, 
      password, 
      numeroIdentificacion, 
      direccionResidencia, 
      paisResidencia 
    } = body;

    // 1. Validación de seguridad básica
    if (!nombre?.trim() || !email?.trim() || !password || password.length < 4) {
      throw new HttpException(
        'Nombre, email y contraseña (min 4 caracteres) son obligatorios', 
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      // 2. Delegamos la lógica al servicio
      // Usamos el método addReferral que ya tienes en tu UsersService
      await this.usersService.addReferral({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password: password, 
        numeroIdentificacion: numeroIdentificacion?.trim(),
        direccionResidencia: direccionResidencia?.trim(),
        paisResidencia: paisResidencia?.trim()
      }, null); // null porque es un registro de usuario raíz

      return { 
        success: true, 
        message: 'Usuario raíz creado exitosamente' 
      };
      
    } catch (error) {
      console.error(error);
      // 3. Manejo de errores
      throw new HttpException(
        'El correo electrónico ya está registrado o hubo un error al crear el usuario', 
        HttpStatus.CONFLICT
      );
    }
  }
}