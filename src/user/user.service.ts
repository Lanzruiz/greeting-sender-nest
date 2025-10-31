import { Injectable } from '@nestjs/common';
import { UserStatus } from './user.model';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { WrongUserStatusException } from './exceptions/wrong-user-status.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// import { TypedConfigService } from 'src/config/typed-config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async create(createUserDto: CreateUserDTO): Promise<User> {
    // const prefix = this.configService.get<AppConfig>('app')?.messagePrefix;
    // const user: User = {
    //   id: randomUUID(),
    //   ...createUserDto,
    // };

    // this.users.push(user);
    // console.log('Prefix:', prefix);

    return await this.userRepository.save(createUserDto);
  }

  public async deleteUser(user: User): Promise<void> {
    // this.users = this.users.filter(
    //   (filteredTask) => filteredTask.id !== user.id,
    // );
    await this.userRepository.delete(user);
  }

  public async updateUser(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (
      updateUserDto.status &&
      !this.isValidStatusTransition(user.status, updateUserDto.status)
    ) {
      throw new WrongUserStatusException();
    }

    // if (updateUserDto.status) {
    //   updateUserDto.status = this.getUniqueLabels(updateUserDto.status);
    // }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  private isValidStatusTransition(
    currentStatus: UserStatus,
    newStatus: UserStatus,
  ): boolean {
    const statusOrder = [UserStatus.IN_ACTIVE, UserStatus.ACTIVE];
    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

  findOne(id: string): Promise<User | null> {
    // return this.users.find((user) => user.id === id);
    return this.userRepository.findOneBy({ id });
  }
}
