import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly tasksRepository: TasksRepository) {}

  async get(userId: number): Promise<TaskDto[]> {
    this.logger.log(`Getting all tasks for user with id: ${userId}`);

    const tasks = await this.tasksRepository.get(userId);

    const tasksDto: TaskDto[] = tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        note: task.note,
        actPomodoro: task.actPomodoro,
        estPomodoro: task.estPomodoro,
        finished: task.finished,
      };
    });

    return tasksDto;
  }

  async getTaskById(taskId: number): Promise<Task> {
    this.logger.log(`Getting task with id: ${taskId}`);

    const task = await this.tasksRepository.getByTaskId(taskId);

    if (!task) throw new NotFoundException('Could not find task with given id');

    return task;
  }

  async create(createTask: CreateTaskDto, userId: number): Promise<TaskDto> {
    this.logger.log(
      `Creating task: ${JSON.stringify(
        createTask,
      )} for user with id: ${userId}`,
    );

    const createdTask = await this.tasksRepository.createTask({
      user: { connect: { id: userId } },
      ...createTask,
    });

    return {
      id: createdTask.id,
      title: createdTask.title,
      note: createdTask.note,
      actPomodoro: createdTask.actPomodoro,
      estPomodoro: createdTask.estPomodoro,
      finished: createdTask.finished,
    };
  }

  async update(
    updatedTask: UpdateTaskDto,
    taskId: number,
    userId: number,
  ): Promise<TaskDto> {
    this.logger.log(
      `Updating task: ${JSON.stringify(updatedTask)} with id: ${taskId}`,
    );

    const task = await this.getTaskById(taskId);

    if (task.userId !== userId)
      throw new ForbiddenException(
        'You can not update a task that is not yours',
      );

    const taskToReturn = await this.tasksRepository.updateTask(
      updatedTask,
      taskId,
    );

    return {
      id: taskToReturn.id,
      title: taskToReturn.title,
      note: taskToReturn.note,
      actPomodoro: taskToReturn.actPomodoro,
      estPomodoro: taskToReturn.estPomodoro,
      finished: taskToReturn.finished,
    };
  }

  async remove(taskId: number, userId: number): Promise<void> {
    this.logger.log(
      `Deleting task with id: ${taskId} by user with id: ${userId}`,
    );

    const task = await this.getTaskById(taskId);

    if (task.userId !== userId)
      throw new ForbiddenException(
        'Can not remove task that does not belong to you',
      );

    await this.tasksRepository.remove(taskId);
  }
}
