import { Injectable } from '@nestjs/common';
import { Email, EmailSend } from './email.model';
import { randomUUID } from 'crypto';
import { CreateEmailDTO } from './create-email.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private emails: Email[] = [];

  findAll(): Email[] {
    return this.emails;
  }

  async send(createEmailDto: CreateEmailDTO): Promise<EmailSend> {
    const prefix = this.configService.get<string>('app.messagePrefix');
    const response = await axios.post(
      'https://eop7al0jqtbxyqv.m.pipedream.net',
      {
        to: createEmailDto.reciever,
        subject: createEmailDto.subject,
        body: createEmailDto.message,
      },
    );

    console.log('Email sent:', response.data);
    console.log('Prefix:', prefix);
    return createEmailDto;
  }

  async create(createEmailDto: CreateEmailDTO): Promise<Email> {
    const emails: Email = {
      id: randomUUID(),
      ...createEmailDto,
    };
    await this.send(createEmailDto);

    this.emails.push(emails);
    return emails;
  }
}
