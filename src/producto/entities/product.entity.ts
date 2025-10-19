import { Category } from 'src/categorias/category.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;
  
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
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}