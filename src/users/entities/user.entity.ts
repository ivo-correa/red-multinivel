import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  Tree, 
  TreeParent, 
  TreeChildren 
} from 'typeorm';

@Entity('users_table') // Nombre de la tabla base
@Tree("closure-table") // Estrategia de árbol mediante tabla de cierre
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  numeroIdentificacion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccionResidencia: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paisResidencia: string;

  // Relación jerárquica
  @TreeParent({ onDelete: 'SET NULL' })
  parent: User;

  @TreeChildren({ cascade: true })
  children: User[];
}