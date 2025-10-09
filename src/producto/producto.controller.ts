// import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
// import { AppService } from '../app.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger'; 

// @ApiTags('productos')
// @Controller('productos')
// export class ProductosController {
//   constructor(private readonly appService: AppService) {}


//   @Post()
//   @ApiOperation({ summary: 'Crear un nuevo producto' })
//   create(@Body() payload: CreateProductDto) {
//     console.log(payload);
//     return {
//       message: 'Producto creado exitosamente',
//       data: payload,
//     };
//   }

//   // Ruta con parámetros: http://localhost:3001/productos/123
//   @Get(':id')
//   getProducto(@Param('id') id: string) {
//     if (parseInt(id) > 100) {
//       throw new NotFoundException(`Producto con ID ${id} no encontrado`);
//     }
//     return `Este es el producto con ID => ${id}`;
//   }

//   // Ruta con queries: http://localhost:3001/productos?limit=10&offset=5
//   @Get()
//   getProductos(@Query('limit') limit = 100, @Query('offset') offset = 0) {
//     return `Listado de productos: limit=${limit} y offset=${offset}`;
//   }


//   @Get()
//   findAll(
//     @Query('limit') limit = 100, // Captura el query 'limit', si no viene, usa 100
//     @Query('offset') offset = 0,   // Captura el query 'offset', si no viene, usa 0
//     @Query('brand') brand: string, // Captura el query 'brand'
//   ) {
//     return `Listado de productos: limit=${limit}, offset=${offset} y brand=${brand}`;
//   }


//   @Put(':id')
//   update(@Param('id') id: string, @Body() payload: CreateProductDto) {
//     return {
//       message: `Producto con ID ${id} actualizado`,
//       data: payload,
//     };
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return `Eliminando el producto con ID ${id}`;
//   }
// }



// Nota: La ruta del servicio y los DTOs ha cambiado
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto'; // <-- 2. Importa DTOs de su nueva ubicación
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './producto.service';
import { UpdateProductDto } from './dto/update-producto.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  // 3. Inyecta ProductsService en lugar de AppService
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  // 4. Un solo método GET que maneja todos los queries
  findAll() {
    // 5. Llama al método del servicio que habla con la BD
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}