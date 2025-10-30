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
import { UserService } from './user.service';
import type { User } from './user.model';
import { FindOneParams } from 'src/email/find-one.params';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserStatusDTO } from './update-user-status.dto';
import { WrongUserStatusException } from './exceptions/wrong-user-status.exception';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public findAll(): User[] {
    return this.userService.findAll();
  }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): User {
    return this.findOneOrFail(params.id);
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserStatusDTO,
  ) {
    const email = this.findOneOrFail(params.id);
    // return this.taskService.updateTask(task, updateTaskDto);
    try {
      return this.userService.updateUser(email, updateUserDto);
    } catch (error) {
      if (error instanceof WrongUserStatusException) {
        throw new BadRequestException([error.message]);
      }
      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: FindOneParams): void {
    const user = this.findOneOrFail(params.id);
    this.userService.deleteUser(user);
  }

  private findOneOrFail(id: string): User {
    const user = this.userService.findOne(id);

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }
}
