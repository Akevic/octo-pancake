import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  getTaskById (id: string): Task {
    return this.tasks.find(task => task.id === id)
  }

  createTask (CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task
  }

  deleteTask (id: string): Task[] {
    const taskToDelete = this.getTaskById(id)
    this.tasks.splice(this.tasks.indexOf(taskToDelete), 1)
    return this.tasks
  }

  updateTaskStatus (id: string, PatchTaskDto: PatchTaskDto): Task {
    const { status } = PatchTaskDto
    const taskToUpdate = this.getTaskById(id)
    taskToUpdate.status = status

    return taskToUpdate
  }
}
