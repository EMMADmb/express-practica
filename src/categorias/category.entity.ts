// src/categories/category.entity.ts
import { Product } from 'src/producto/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}