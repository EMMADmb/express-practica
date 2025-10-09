import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return role;
  }

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(newRole);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.preload({
      id: id,
      ...updateRoleDto,
    });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
  }
}