import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { CreateUserDTO } from './create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './update-user.dto';
import { WrongUserStatusException } from './exceptions/wrong-user-status.exception';

@Injectable()
export class UserService {
  private users: User[] = [];
  findAll(): User[] {
    return this.users;
  }

  public create(createUserDto: CreateUserDTO): User {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
    };

    this.users.push(user);

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
