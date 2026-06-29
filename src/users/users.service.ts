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

  // --- CRUD BÁSICO ---

  public async addReferral(userData: any, sponsorId: number | null) {
    let parent: User | null = null;
    if (sponsorId) {
      parent = await this.userRepo.findOne({ where: { id: sponsorId } });
      if (!parent) throw new NotFoundException(`Sponsor con ID ${sponsorId} no encontrado`);
    }

    const newUser = this.userRepo.create({
      ...userData,
      parent: parent || undefined
    });

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

  // --- MÉTODOS DE RED (CORREGIDOS) ---

  /**
   * Retorna los líderes raíz junto con todo su árbol de descendientes.
   * Usamos findDescendantsTree para que el objeto 'children' se llene
   * automáticamente consultando la tabla 'user_closure'.
   */
  async findAllRoots() {
    const roots = await this.userRepo.findRoots();
    
    // Al mapear cada raíz con findDescendantsTree, NestJS construye 
    // el JSON jerárquico que tu app necesita.
    return await Promise.all(
      roots.map((root) => this.userRepo.findDescendantsTree(root))
    );
  }

  /**
   * Carga el árbol completo a partir de un ID específico.
   */
  async getChildren(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    
    return await this.userRepo.findDescendantsTree(user);
  }

  async getFullNetwork(id: number) {
    const root = await this.userRepo.findOne({ where: { id } });
    return root ? await this.userRepo.findDescendantsTree(root) : null;
  }
}