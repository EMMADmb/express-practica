  import { Controller, Get } from '@nestjs/common'; 
  import { AppService } from './app.service';
  
  @Controller()
  export class AppController {
    constructor(private readonly appService: AppService) {}
  
    @Get()
    getHello(): string {
      return this.appService.getHello();
    }
  
    @Get('nuevo') 
    getNuevo(): string {
      return 'Esta es una nueva ruta';
    }
  
    @Get('/ruta/') 
    getRuta(): object {
      return { id: 1, name: 'Mi Ruta' }; 
    }
  }