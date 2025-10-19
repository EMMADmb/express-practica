// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';

// import { User } from './users/user.entity';
// import { IsUniqueConstraint } from './validators/is-unique.validator';
// import { Product } from './producto/entities/product.entity';
// import { Category } from './categorias/category.entity';
// import { Role } from './role/role.entity';
// import { CategoriesModule } from './categorias/categorias.module';
// import { ProductsModule } from './producto/producto.module';
// import { RoleModule } from './role/role.module';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: '', // Tu contraseña
//       database: 'bd_localspace',
//       entities: [Product, Category, User, Role],
//       synchronize: true,
//     }),
//     AuthModule,
//     CategoriesModule,
//     ProductsModule,
//     RoleModule,
//     UsersModule,
//   ],
//   controllers: [],
//   providers: [IsUniqueConstraint], // <-- Añade el validador aquí
// })
// export class AppModule {}




import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // <-- Importa ConfigModule
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { IsUniqueConstraint } from './validators/is-unique.validator';
import { Product } from './producto/entities/product.entity';
import { Role } from './role/role.entity';
import { Category } from './categorias/category.entity';
import { CategoriesModule } from './categorias/categorias.module';
import { ProductsModule } from './producto/producto.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. EL CONFIGMODULE DEBE IR PRIMERO Y SER GLOBAL
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. AHORA CONFIGURAMOS TYPEORM LEYENDO ESAS VARIABLES
    TypeOrmModule.forRoot({
      // Agregamos '!' a todas las variables de entorno de tipo string/number para asertar que existen.
      host: process.env.DB_HOST!, 
      port: parseInt(process.env.DB_PORT!, 10), 
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_DATABASE!,
      entities: [Product, Category, User, Role],
      synchronize: true, // Esto solo debería estar true en desarrollo
    }),
    
    // 3. EL RESTO DE MÓDULOS DE FUNCIÓN
    AuthModule,
    CategoriesModule,
    ProductsModule,
    RoleModule,
    UsersModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}