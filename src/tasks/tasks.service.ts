import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  getTasksWithFilters (filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto

    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search)
      )
    }

    return tasks
  }

  getTaskById (id: string): Task {
    const found =  this.tasks.find(task => task.id === id)

    if (!found) {
        throw new NotFoundException(`Task with given ID "${id}" is not found`)
      }
      return found
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
