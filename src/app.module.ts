// // import { Module } from '@nestjs/common';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { AuthModule } from './auth/auth.module';

// // import { User } from './users/user.entity';
// // import { IsUniqueConstraint } from './validators/is-unique.validator';
// // import { Product } from './producto/entities/product.entity';
// // import { Category } from './categorias/category.entity';
// // import { Role } from './role/role.entity';
// // import { CategoriesModule } from './categorias/categorias.module';
// // import { ProductsModule } from './producto/producto.module';
// // import { RoleModule } from './role/role.module';
// // import { UsersModule } from './users/users.module';

// // @Module({
// //   imports: [
// //     TypeOrmModule.forRoot({
// //       type: 'mysql',
// //       host: 'localhost',
// //       port: 3306,
// //       username: 'root',
// //       password: '', // Tu contraseña
// //       database: 'bd_localspace',
// //       entities: [Product, Category, User, Role],
// //       synchronize: true,
// //     }),
// //     AuthModule,
// //     CategoriesModule,
// //     ProductsModule,
// //     RoleModule,
// //     UsersModule,
// //   ],
// //   controllers: [],
// //   providers: [IsUniqueConstraint], // <-- Añade el validador aquí
// // })
// // export class AppModule {}




// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- Importa ConfigModule
// import { AuthModule } from './auth/auth.module';
// import { User } from './users/user.entity';
// import { IsUniqueConstraint } from './validators/is-unique.validator';
// import { Product } from './producto/entities/product.entity';
// import { Role } from './role/role.entity';
// import { Category } from './categorias/category.entity';
// import { CategoriesModule } from './categorias/categorias.module';
// import { ProductsModule } from './producto/producto.module';
// import { RoleModule } from './role/role.module';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule], 
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get<string>('DB_HOST'), 
//         port: parseInt(configService.get<string>('DB_PORT')!, 10), 
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'), 
//         database: configService.get<string>('DB_DATABASE'), 
//         entities: [Product, Category, User, Role], 
//         synchronize: true,
//       }),
//       inject: [ConfigService], 
//     }),

//     AuthModule,
//     CategoriesModule,
//     ProductsModule,
//     RoleModule,
//     UsersModule,
//   ],
//   controllers: [],
//   providers: [IsUniqueConstraint],
// })
// export class AppModule {}







import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { IsUniqueConstraint } from './validators/is-unique.validator';
import { UsersModule } from './users/users.module';
import { Product } from './producto/entities/product.entity';
import { Category } from './categorias/category.entity';
import { Role } from './role/role.entity';
import { CategoriesModule } from './categorias/categorias.module';
import { ProductsModule } from './producto/producto.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    // 1. MÓDULO DE CONFIGURACIÓN GLOBAL
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. CONFIGURACIÓN ASÍNCRONA PARA POSTGRESQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Usamos el driver de PostgreSQL
        url: configService.get<string>('DATABASE_URL'), // Lee la URL completa de Neon/Supabase
        entities: [Product, Category, User, Role],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // 3. MÓDULOS DE FUNCIONALIDAD
    AuthModule,
    CategoriesModule,
    ProductsModule,
    RoleModule,
    UsersModule,
  ],
  controllers: [],
  // 4. PROVIDERS GLOBALES
  providers: [IsUniqueConstraint],
})
export class AppModule {}