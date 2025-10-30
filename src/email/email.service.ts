import { Injectable } from '@nestjs/common';
import { Email, EmailSend, EmailStatus } from './email.model';
import { randomUUID } from 'crypto';
import { CreateEmailDTO } from './create-email.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UpdateEmailDto } from './update-email.dto';
import { WrongEmailStatusException } from './execptions/wrong-email-status.exception';

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

  create(createEmailDto: CreateEmailDTO): Email {
    const emails: Email = {
      id: randomUUID(),
      ...createEmailDto,
    };
    //await this.send(createEmailDto);

    this.emails.push(emails);
    return emails;
  }

  public updateEmail(email: Email, updateEmailDto: UpdateEmailDto): Email {
    if (
      updateEmailDto.status &&
      !this.isValidStatusTransition(email.status, updateEmailDto.status)
    ) {
      throw new WrongEmailStatusException();
    }
    Object.assign(email, updateEmailDto);
    //await this.send(updateEmailDto as CreateEmailDTO);
    return email;
  }

  private isValidStatusTransition(
    currentStatus: EmailStatus,
    newStatus: EmailStatus,
  ): boolean {
    const statusOrder = [
      EmailStatus.NOT_SENT,
      EmailStatus.IN_PROGRESS,
      EmailStatus.SENT,
    ];
    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

  findOne(id: string): Email | undefined {
    return this.emails.find((email) => email.id === id);
  }
}
