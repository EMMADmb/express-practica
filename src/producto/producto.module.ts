import { Module } from '@nestjs/common';
import { ProductsController } from './producto.controller';
import { ProductsService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
