import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async registerUser(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  async findUserByGoogleId(googleId: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { google_id: googleId } });
  }

  async updateUser(userId: number, user: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt: user.hashedRt },
    });
  }
}
