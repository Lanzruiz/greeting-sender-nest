/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from './task.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @ApiProperty()
  status: TaskStatus;
}
