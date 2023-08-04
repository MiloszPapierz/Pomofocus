import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserEntity } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<UserEntity[]> {
    return this.appService.getHello();
  }
}
