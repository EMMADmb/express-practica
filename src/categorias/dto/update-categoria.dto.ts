import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoryDto) {}
