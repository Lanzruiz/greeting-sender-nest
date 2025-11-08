import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsString()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reciever: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;
}
