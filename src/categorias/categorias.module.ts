import { Module } from '@nestjs/common';
import { CategoriesController } from './categorias.controller';
import { CategoriesService } from './categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
