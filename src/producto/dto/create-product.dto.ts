import { IsString, IsNotEmpty, IsNumber, IsPositive, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsPositive()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
  
  // --- CAMPOS DE AUDITORÍA OPCIONALES ---
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsString()
  UserAlta?: string;
}