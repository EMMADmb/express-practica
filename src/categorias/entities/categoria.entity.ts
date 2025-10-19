import { Product } from 'src/producto/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  
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
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}