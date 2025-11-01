import { Injectable } from '@nestjs/common';
import { EmailSend, EmailStatus } from './email.model';
import { CreateEmailDTO } from './create-email.dto';
import axios from 'axios';
import { UpdateEmailDto } from './update-email.dto';
import { WrongEmailStatusException } from './execptions/wrong-email-status.exception';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    private readonly configService: ConfigService,
  ) {}

  findAll(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  public async send(createEmailDto: CreateEmailDTO): Promise<EmailSend> {
    const emailServer = this.configService.get<string>('app.emailServer');
    if (!emailServer) {
      throw new Error('Email server configuration is missing');
    }
    try {
      const response = await axios.post(
        emailServer,
        {
          to: createEmailDto.reciever,
          subject: createEmailDto.subject,
          body: createEmailDto.message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        subject: createEmailDto.subject,
        message: createEmailDto.message,
        reciever: createEmailDto.reciever,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: response.headers.date,
        userId: createEmailDto.userId,
        status: EmailStatus.SENT,
      };
    } catch (error) {
      return {
        subject: createEmailDto.subject,
        message: createEmailDto.message,
        reciever: createEmailDto.reciever,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: new Date(),
        userId: createEmailDto.userId,
        status: EmailStatus.NOT_SENT,
      };
      // throw error;
    }
  }

  async create(createEmailDto: CreateEmailDTO): Promise<Email> {
    const sent = await this.send(createEmailDto);

    console.log('sent', sent);

    // this.emails.push(emails);
    return await this.emailRepository.save(sent);
  }

  public async updateEmail(
    email: Email,
    updateEmailDto: UpdateEmailDto,
  ): Promise<Email> {
    if (
      updateEmailDto.status &&
      !this.isValidStatusTransition(email.status, updateEmailDto.status)
    ) {
      throw new WrongEmailStatusException();
    }
    Object.assign(email, updateEmailDto);
    //await this.send(updateEmailDto as CreateEmailDTO);
    return await this.emailRepository.save(email);
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

  findOne(id: string): Promise<Email | null> {
    // return this.emails.find((email) => email.id === id);
    return this.emailRepository.findOneBy({ id });
  }
}
