// import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
// import { CategoriesService } from './categorias.service';
// import { CreateCategoryDto } from './dto/create-categoria.dto';

// @Controller('categories')
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) {}

//   @Get()
//   findAll() {
//     return this.categoriesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.categoriesService.findOne(+id);
//   }

//   @Post()
//   create(@Body() createCategoryDto: CreateCategoryDto) {
//     return this.categoriesService.create(createCategoryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.categoriesService.remove(+id);
//   }
// }



import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categorias.service';
import { CreateCategoryDto } from './dto/create-categoria.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  // Solo un usuario autenticado puede crear categorías
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Solo un Administrador puede eliminar categorías
  @Roles('Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}