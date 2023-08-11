import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { TasksController } from './tasks.controller';
import { TaksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TaksService, TasksRepository],
})
export class TasksModule {}
