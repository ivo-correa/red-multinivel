import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class RegisterController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { nombre, email, password, numeroIdentificacion, direccionResidencia, paisResidencia } = body;

    // 1. Validación de seguridad estricta
    if (!nombre?.trim() || !email?.trim() || !password || password.length < 4) {
      throw new HttpException('Nombre, email y contraseña (min 4 caracteres) son obligatorios', HttpStatus.BAD_REQUEST);
    }

    try {
      // 2. Crear instancia (con trim para evitar basura)
      const nuevoUsuario = this.userRepository.create({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password: password, 
        numeroIdentificacion: numeroIdentificacion?.trim(),
        direccionResidencia: direccionResidencia?.trim(),
        paisResidencia: paisResidencia?.trim()
      });

      // 3. Guardar en base de datos
      await this.userRepository.save(nuevoUsuario);
      
      return { 
        success: true, 
        message: 'Usuario raíz creado exitosamente' 
      };
    } catch (error) {
      // Si llega aquí, es probablemente un error de email duplicado (UNIQUE constraint)
      console.error(error);
      throw new HttpException('El correo electrónico ya está registrado', HttpStatus.CONFLICT);
    }
  }
}