import { IsString, IsNotEmpty } from 'class-validator';
import { IsUnique } from '../../validators/is-unique.validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'categories', column: 'name' }, {
    message: 'El nombre de la categoría ya existe.',
  })
  name: string;
}