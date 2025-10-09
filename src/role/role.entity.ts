// src/roles/role.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}