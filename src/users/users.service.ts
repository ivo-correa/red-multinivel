import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: TreeRepository<User>,
  ) {}

  async findAllRoots() {
    try {
      // Intentamos ejecutar la operación de árbol
      const roots = await this.userRepo.findRoots();
      
      return await Promise.all(
        roots.map((root) => this.userRepo.findDescendantsTree(root))
      );
    } catch (error) {
      // ESTO ES LO QUE NECESITAMOS:
      // Al imprimir esto en los logs de Render, sabremos si falta una tabla 
      // o si hay un problema de permisos.
      console.error('--- ERROR DETALLADO EN FINDROOTS ---');
      console.error(error);
      throw error; 
    }
  }

  // ... (tus otros métodos se mantienen igual)
  public async addReferral(userData: any, sponsorId: number | null) {
    let parent: User | null = null;
    if (sponsorId) {
      parent = await this.userRepo.findOne({ where: { id: sponsorId } });
      if (!parent) throw new NotFoundException(`Sponsor con ID ${sponsorId} no encontrado`);
    }
    const newUser = this.userRepo.create({ ...userData, parent: parent || undefined });
    return await this.userRepo.save(newUser);
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  async updateUser(id: number, updateData: any) {
    const user = await this.getUserById(id);
    Object.assign(user, updateData);
    return await this.userRepo.save(user);
  }
}