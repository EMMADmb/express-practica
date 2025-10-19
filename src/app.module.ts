import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { IsUniqueConstraint } from './validators/is-unique.validator';
import { Product } from './producto/entities/product.entity';
import { Category } from './categorias/category.entity';
import { Role } from './role/role.entity';
import { CategoriesModule } from './categorias/categorias.module';
import { ProductsModule } from './producto/producto.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Tu contraseña
      database: 'bd_localspace',
      entities: [Product, Category, User, Role],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
    ProductsModule,
    RoleModule,
    UsersModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint], // <-- Añade el validador aquí
})
export class AppModule {}