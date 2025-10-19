import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { IsUnique } from '../../validators/is-unique.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  @IsUnique({ tableName: 'users', column: 'email' }, {
    message: 'El correo electrónico ya está en uso.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;

  @IsOptional()
  @IsNumber()
  roleId?: number;
}