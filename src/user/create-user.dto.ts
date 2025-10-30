import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UserStatus } from './user.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nick_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  birth_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  country: string;

  @ApiProperty()
  status: UserStatus;
}
