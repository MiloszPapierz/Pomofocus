import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: number) {
    return await this.prisma.task.findMany({ where: { userId } });
  }

  async getByTaskId(taskId: number) {
    return await this.prisma.task.findFirst({ where: { id: taskId } });
  }

  async createTask(task: Prisma.TaskCreateInput) {
    return await this.prisma.task.create({ data: task });
  }

  async updateTask(task: Prisma.TaskUpdateInput, taskId: number) {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { ...task },
    });
  }

  async remove(taskId: number) {
    return await this.prisma.task.delete({ where: { id: taskId } });
  }
}
