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
import { FindOneParams } from 'src/email/find-one.params';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserStatusDTO } from './update-user-status.dto';
import { WrongUserStatusException } from './exceptions/wrong-user-status.exception';
import { User } from './user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Promise<User> {
    return this.findOneOrFail(params.id);
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  public async updateTask(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserStatusDTO,
  ): Promise<User> {
    const user = this.findOneOrFail(params.id);
    try {
      return await this.userService.updateUser(await user, updateUserDto);
    } catch (error) {
      if (error instanceof WrongUserStatusException) {
        throw new BadRequestException([error.message]);
      }
      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTask(@Param() params: FindOneParams): Promise<void> {
    const user = await this.findOneOrFail(params.id);
    this.userService.deleteUser(user);
  }

  private async findOneOrFail(id: string): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
