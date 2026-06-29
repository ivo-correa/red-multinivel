import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetworkRelation } from './entities/network.entity';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(NetworkRelation)
    private networkRepository: Repository<NetworkRelation>,
  ) {}

  /**
   * Registra una nueva relación en la red.
   * @param data Objeto con los datos necesarios (sponsor_id, usuario_id, etc.)
   */
  async registrarRelacion(data: any) {
    // Creamos la nueva entidad con los datos recibidos
    // Si 'profundidad' no viene en los datos, le asignamos 0 por defecto
    const nuevaRelacion = this.networkRepository.create({
      ...data,
      profundidad: data.profundidad || 0,
    });
    
    // Guardamos en la base de datos
    return await this.networkRepository.save(nuevaRelacion);
  }

  // Puedes añadir otros métodos aquí más adelante
  async obtenerRedCompleta() {
    return await this.networkRepository.find();
  }
}