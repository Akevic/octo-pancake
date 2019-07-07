import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller ('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

    @Get()
    getTasks (@Query() filterDto: GetTasksFilterDto): Task[] {
      if (Object.keys(filterDto).length) {
        return this.tasksService.getTasksWithFilters(filterDto)
      } else {
        return this.tasksService.getAllTasks();
      }
    }

    @Get('/:id')
    getTaskById (@Param('id') id: string): Task {
      return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
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
