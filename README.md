# API de Productos con NestJS

Este proyecto es una API RESTful construida con **NestJS** para la gestión de productos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) y está conectada a una base de datos **MySQL** utilizando **TypeORM**.

Además, la API genera automáticamente su propia documentación interactiva utilizando **Swagger**.

## ✨ Características

* **Framework robusto:** Construido sobre la arquitectura modular de NestJS.
* **Base de datos relacional:** Persistencia de datos en MySQL a través del ORM TypeORM.
* **Operaciones CRUD completas:** Gestión total de recursos de productos.
* **Manejo de solicitudes:** Procesamiento de parámetros de ruta, queries y cuerpo de la solicitud (`body`).
* **Validación de datos:** Uso de DTOs (Data Transfer Objects) para estructurar los datos de entrada.
* **Middleware:** Implementación de un logger personalizado para registrar las solicitudes entrantes.
* **Documentación automática:** Documentación interactiva y auto-generada con Swagger.

## 🛠️ Tecnologías Utilizadas

* [**NestJS**](https://nestjs.com/): Un framework progresivo de Node.js para construir aplicaciones eficientes y escalables.
* [**TypeScript**](https://www.typescriptlang.org/): Superconjunto de JavaScript que añade tipado estático.
* [**TypeORM**](https://typeorm.io/): Un ORM (Object-Relational Mapper) para TypeScript y JavaScript.
* [**MySQL**](https://www.mysql.com/): Sistema de gestión de bases de datos relacional.
* [**Swagger**](https://swagger.io/): Herramienta para diseñar, construir, documentar y consumir servicios RESTful.

## 🚀 Empezando

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:
* Node.js (v16 o superior)
* npm (usualmente viene con Node.js)
* Un servidor de base de datos MySQL en funcionamiento.

### Instalación y Configuración

1.  **Clona el repositorio** (o simplemente abre tu carpeta de proyecto existente):
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instala las dependencias** del proyecto:
    ```bash
    npm install
    ```

3.  **Configura la conexión a la base de datos:**
    * Asegúrate de haber creado una base de datos vacía en MySQL (ej. `nest_db`).
    * Abre el archivo `src/app.module.ts` y modifica los datos de conexión de `TypeOrmModule` con tus credenciales:

    ```typescript
    // src/app.module.ts
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',         // <-- Cambia si es necesario
      port: 3306,                // <-- Cambia si es necesario
      username: 'root',            // <-- Tu usuario de MySQL
      password: 'tu_contraseña', // <-- Tu contraseña de MySQL
      database: 'nest_db',         // <-- El nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Mantener en true solo para desarrollo!
    }),
    ```

### Ejecutar la Aplicación

Una vez configurado, puedes iniciar la aplicación en modo de desarrollo. El servidor se reiniciará automáticamente cada vez que guardes un cambio en el código.

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3001`.

## 📖 Uso y Documentación de la API

### Documentación Interactiva (Swagger)

La forma más sencilla de explorar y probar la API es a través de la documentación interactiva generada por Swagger.

Una vez que la aplicación esté corriendo, abre tu navegador y ve a:
**[http://localhost:3001/api-docs](http://localhost:3001/api-docs)**

Desde esta interfaz podrás ver todos los endpoints, sus parámetros, los modelos de datos y ejecutar pruebas en tiempo real.



### Tabla de Endpoints

| Acción | Método HTTP | URL | Descripción |
| :--- | :--- | :--- | :--- |
| Obtener todos | `GET` | `/productos` | Devuelve una lista de productos. |
| Obtener uno | `GET` | `/productos/:id` | Devuelve un producto específico por su `id`. |
| Crear uno | `POST` | `/productos` | Crea un nuevo producto. Requiere un JSON en el body. |
| Actualizar uno | `PUT` | `/productos/:id` | Actualiza un producto. Requiere un JSON en el body. |
| Eliminar uno | `DELETE` | `/productos/:id` | Elimina un producto específico por su `id`. |

## 👤 Autor

* **[EMMANUEL]** - *[Estuduate]* - []