import { Injectable } from '@nestjs/common';
import { Email, EmailSend } from './email.model';
import { randomUUID } from 'crypto';
import { CreateEmailDTO } from './create-email.dto';
import axios from 'axios';

@Injectable()
export class EmailService {
  private emails: Email[] = [];
  findAll(): Email[] {
    return this.emails;
  }

  async send(createEmailDto: CreateEmailDTO): Promise<EmailSend> {
    const response = await axios.post(
      'https://eop7al0jqtbxyqv.m.pipedream.net',
      {
        to: createEmailDto.reciever,
        subject: createEmailDto.subject,
        body: createEmailDto.message,
      },
    );

    console.log('Email sent:', response.data);
    return createEmailDto;
  }

  create(createEmailDto: CreateEmailDTO): Email {
    const emails: Email = {
      id: randomUUID(),
      ...createEmailDto,
    };
    this.send(createEmailDto);

    this.emails.push(emails);
    return emails;
  }
}
