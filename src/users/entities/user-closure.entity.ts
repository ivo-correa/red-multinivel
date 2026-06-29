import { Entity, PrimaryColumn, JoinColumn, ManyToOne, TreeLevelColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserClosure {
  @PrimaryColumn()
  idAncestor: number;

  @PrimaryColumn()
  idDescendant: number;
  
  // Opcional: si necesitas tracking de niveles
  @TreeLevelColumn()
  level: number;
}