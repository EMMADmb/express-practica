// import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { ProductsService } from './producto.service';
// import { UpdateProductDto } from './dto/update-producto.dto';

// @ApiTags('products')
// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Get()
//   @ApiOperation({ summary: 'Obtener todos los productos (con filtros opcionales)' })
//   findAll(@Query() queryParams: any) {
//     return this.productsService.findAll(queryParams);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Obtener un producto por ID' })
//   findOne(@Param('id') id: string) {
//     return this.productsService.findOne(+id);
//   }

//   @Post()
//   @ApiOperation({ summary: 'Crear un nuevo producto' })
//   create(@Body() createProductDto: CreateProductDto) {
//     return this.productsService.create(createProductDto);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Actualizar un producto existente' })
//   update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
//     return this.productsService.update(+id, updateProductDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Eliminar un producto' })
//   remove(@Param('id') id: string) {
//     return this.productsService.remove(+id);
//   }
// }



import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './producto.service';
import { UpdateProductDto } from './dto/update-producto.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos (Público)' })
  findAll(@Query() queryParams: any) {
    return this.productsService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID (Público)' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiBearerAuth() 
  @UseGuards(AuthGuard('jwt')) 
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto (Protegido)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente (Protegido)' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto (Protegido)' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}