import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
