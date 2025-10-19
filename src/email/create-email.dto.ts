/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmailStatus } from './email.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reciever: string;
  @IsNotEmpty()
  @IsEnum(EmailStatus)
  @ApiProperty()
  status: EmailStatus;
}
