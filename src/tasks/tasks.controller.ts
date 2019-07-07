import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';

@Controller ('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks (): Task[] {
      return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById (@Param('id') id: string): Task {
      return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask (@Body() CreateTaskDto: CreateTaskDto): Task {
      return this.tasksService.createTask(CreateTaskDto)
    }

    @Delete('/:id')
    deleteTask (@Param('id') id: string): Task[] {
      return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus (@Param('id') id: string, @Body() PatchTaskDto: PatchTaskDto) {
      return this.tasksService.updateTaskStatus(id, PatchTaskDto)
    }
}
