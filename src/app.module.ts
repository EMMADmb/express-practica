import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categorias/category.entity';
import { User } from './users/user.entity';
import { Role } from './role/role.entity';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { Product } from './producto/entities/product.entity';
import { ProductsModule } from './producto/producto.module';
import { CategoriesModule } from './categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // <-- TU CONTRASEÑA
      database: 'bd_localspace',
      entities: [Product, Category, User, Role],
      synchronize: true, // true solo para desarrollo
    }),
    UsersModule,
    RoleModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}