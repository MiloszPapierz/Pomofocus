import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findUserByUsername(username);
  }
}
