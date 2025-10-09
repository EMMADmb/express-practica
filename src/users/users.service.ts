import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    // IMPORTANTE: En una aplicación real, la contraseña debe ser "hasheada"
    // antes de guardarla. Por ejemplo, usando la librería bcrypt.
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // const newUser = this.usersRepository.create({
    //   ...createUserDto,
    //   password: hashedPassword,
    // });
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}