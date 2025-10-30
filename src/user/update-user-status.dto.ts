import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from './user.model';

export class UpdateUserStatusDTO {
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus;
}
