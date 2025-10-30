import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDTO } from './create-email.dto';

export class UpdateEmailDto extends PartialType(CreateEmailDTO) {}
