import { Product } from 'src/producto/entities/product.entity';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  // --- CAMPOS DE AUDITORÍA ---
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'varchar', length: 20, default: 'Admin' })
  UserAlta: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  FechaAlta: Date;

  @Column({ type: 'varchar', length: 20, default: '' })
  UserMod: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  FechaMod: Date;

  // --- RELACIONES ---
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}