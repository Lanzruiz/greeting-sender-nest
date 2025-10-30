import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { CreateUserDTO } from './create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './update-user.dto';
import { WrongUserStatusException } from './exceptions/wrong-user-status.exception';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/config/config.types';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(private readonly configService: ConfigService<ConfigType>) {}

  findAll(): User[] {
    return this.users;
  }

  public create(createUserDto: CreateUserDTO): User {
    const prefix = this.configService.get<AppConfig>('app')?.messagePrefix;
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
    };

    this.users.push(user);
    console.log('Prefix:', prefix);

    return user;
  }

  public deleteUser(user: User): void {
    this.users = this.users.filter(
      (filteredTask) => filteredTask.id !== user.id,
    );
  }

  public updateUser(user: User, updateUserDto: UpdateUserDto): User {
    if (
      updateUserDto.status &&
      !this.isValidStatusTransition(user.status, updateUserDto.status)
    ) {
      throw new WrongUserStatusException();
    }
    Object.assign(user, updateUserDto);
    //await this.send(updateEmailDto as CreateEmailDTO);
    return user;
  }

  private isValidStatusTransition(
    currentStatus: UserStatus,
    newStatus: UserStatus,
  ): boolean {
    const statusOrder = [UserStatus.IN_ACTIVE, UserStatus.ACTIVE];
    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
