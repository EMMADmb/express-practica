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
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- Importa ConfigModule
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
    // 1. ConfigModule debe ir primero y ser Global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. USAR CONFIGURACIÓN ASÍNCRONA PARA GARANTIZAR QUE LAS VARIABLES ESTÉN CARGADAS
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Dependemos de que ConfigModule se cargue
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), // Lee el HOST
        port: parseInt(configService.get<string>('DB_PORT')!, 10), // Lee el PORT
        username: configService.get<string>('DB_USERNAME'), // Lee el USERNAME
        password: configService.get<string>('DB_PASSWORD'), // Lee la PASSWORD
        database: configService.get<string>('DB_DATABASE'), // Lee la DATABASE
        entities: [Product, Category, User, Role], // Aquí listamos todas las entidades
        synchronize: true,
      }),
      inject: [ConfigService], // Inyecta el servicio de configuración
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