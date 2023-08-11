import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserByEmail(email: string) {
    this.logger.log(`Finding user with email ${email}`);
    return await this.usersRepository.findUserByEmail(email);
  }

  async findUserByGoogleId(googleId: string) {
    this.logger.log(`Finding user with googleid ${googleId}`);
    return await this.usersRepository.findUserByGoogleId(googleId);
  }

  async updateUser(userId: number, user: Prisma.UserUpdateInput) {
    this.logger.log(`Updating user with id ${user}`);
    return await this.usersRepository.updateUser(userId, user);
  }

  async registerUser(user: Prisma.UserCreateInput) {
    this.logger.log(
      `Registering new user ${
        user.google_id ? 'from google' : 'from custom authentication'
      }`,
    );

    return await this.usersRepository.registerUser(user);
  }
}
