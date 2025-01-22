import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_data' })
  handleGetData(): string {
    return 'Hello from microservice!';
  }
  constructor(private readonly appService: AppService) {}
}
