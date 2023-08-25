import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  ParseIntPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtGuard)
  @Get()
  async get(@Req() req) {
    return await this.tasksService.get(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() task: CreateTaskDto) {
    return await this.tasksService.create(task, req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Body() updatedTask: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return await this.tasksService.update(updatedTask, id, req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.tasksService.remove(id, req.user.sub);
  }
}
