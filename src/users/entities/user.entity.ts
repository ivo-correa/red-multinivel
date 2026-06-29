import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeParent, TreeChildren } from 'typeorm';

@Entity('user')
@Tree("closure-table")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  numeroIdentificacion: string;

  // Nuevos campos solicitados
  @Column({ type: 'varchar', length: 255, nullable: true })
  direccionResidencia: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paisResidencia: string;

  @TreeParent()
  parent: User;

  @TreeChildren()
  children: User[];
}