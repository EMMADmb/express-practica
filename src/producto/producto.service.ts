import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-producto.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category', 'user'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'user'],
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.preload({
      id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}