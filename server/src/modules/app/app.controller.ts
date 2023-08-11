import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserEntity } from '@prisma/client';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getHello(): Promise<UserEntity[]> {
    return this.appService.getHello();
  }
}
