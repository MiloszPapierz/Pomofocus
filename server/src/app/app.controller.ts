import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserEntity } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHello(): Promise<UserEntity[]> {
    return this.appService.getHello();
  }
}
