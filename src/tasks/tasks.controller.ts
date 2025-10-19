import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskStatusDTO } from './update-task-status.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }
  //   @Get('/:id/:add')
  //   public findOne(@Param('id') id: any, @Param('add') add: any): string {
  //     return `The number is ${id} and ${add}`;
  //   }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): ITask {
    // const task = this.taskService.findOne(params.id);
    // if (task) {
    //   return task;
    // }
    // throw new NotFoundException();
    return this.findOneOrFail(params.id);
  }
  @Post()
  public create(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.create(createTaskDto);
  }

  // @Patch('/:id/status')
  // public updateTaskStatus(
  //   @Param() params: FindOneParams,
  //   @Body() body: UpdateTaskStatusDTO,
  // ): ITask {
  //   const task = this.findOneOrFail(params.id);
  //   task.status = body.status;
  //   return task;
  // }

  @Patch('/:id')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskStatusDTO,
  ): ITask {
    const task = this.findOneOrFail(params.id);
    // return this.taskService.updateTask(task, updateTaskDto);
    try {
      return this.taskService.updateTask(task, updateTaskDto);
    } catch (error) {
      if (error instanceof WrongTaskStatusException) {
        throw new BadRequestException([error.message]);
      }
      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: FindOneParams): void {
    const task = this.findOneOrFail(params.id);
    this.taskService.deleteTask(task);
  }

  private findOneOrFail(id: string): ITask {
    const task = this.taskService.findOne(id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }
}
