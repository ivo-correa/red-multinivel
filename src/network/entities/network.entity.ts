import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NetworkRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  codigo_referido: string;

  @Column({ type: 'int', default: 0 })
  profundidad: number;
}