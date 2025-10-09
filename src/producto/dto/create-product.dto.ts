import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'El nombre del producto', example: 'Laptop XPS 15' })
  name: string;

  @ApiProperty({ description: 'Una breve descripción del producto' })
  description: string;

  @ApiProperty({ description: 'El precio del producto', example: 2500 })
  price: number;

  @ApiProperty({ description: 'La cantidad disponible en inventario', example: 15 })
  stock: number;
}