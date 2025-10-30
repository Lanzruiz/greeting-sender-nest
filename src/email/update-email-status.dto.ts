import { IsEnum, IsNotEmpty } from 'class-validator';
import { EmailStatus } from './email.model';

export class UpdateEmailStatusDTO {
  @IsNotEmpty()
  @IsEnum(EmailStatus)
  status: EmailStatus;
}
