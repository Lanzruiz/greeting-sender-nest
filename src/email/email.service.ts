import { Injectable } from '@nestjs/common';
import { Email } from './email.model';
import { randomUUID } from 'crypto';
import { CreateEmailDTO } from './create-email.dto';

@Injectable()
export class EmailService {
  private emails: Email[] = [];
  findAll(): Email[] {
    return this.emails;
  }
  create(createTaskDto: CreateEmailDTO): Email {
    const emails: Email = {
      id: randomUUID(),
      ...createTaskDto,
    };

    this.emails.push(emails);
    return emails;
  }
}
