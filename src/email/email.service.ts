import { Injectable } from '@nestjs/common';
import { EmailStatus } from './email.model';
import { CreateEmailDTO } from './create-email.dto';
import axios from 'axios';
import { UpdateEmailDto } from './update-email.dto';
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

  public async send(createEmailDto: CreateEmailDTO): Promise<Email> {
    const emailServer = this.configService.get<string>('app.emailServer');
    if (!emailServer) {
      throw new Error('Email server configuration is missing');
    }
    try {
      await axios.post(
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

      const email = new Email();
      Object.assign(email, {
        subject: createEmailDto.subject,
        message: createEmailDto.message,
        reciever: createEmailDto.reciever,
        name: createEmailDto.name,
        userId: createEmailDto.userId,
        status: EmailStatus.SENT,
      });
      return email;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const email = new Email();
      Object.assign(email, {
        subject: createEmailDto.subject,
        message: createEmailDto.message,
        reciever: createEmailDto.reciever,
        name: createEmailDto.name,
        userId: createEmailDto.userId,
        status: EmailStatus.NOT_SENT,
      });
      // return the Email entity even on failure so callers that expect Email can persist it
      return email;
      // throw error;
    }
  }

  async sendGreetings(
    createEmailDto: CreateEmailDTO,
    option: string,
  ): Promise<Email> {
    switch (option) {
      case 'bday': {
        let email = new Email();
        email = await this.send({
          subject: createEmailDto.subject,
          message: createEmailDto.message,
          reciever: createEmailDto.reciever,
          name: createEmailDto.name,
          userId: createEmailDto.userId,
        });
        console.log(email);
        return await this.emailRepository.save(email);
        break;
      }
      case 'annivesary':
        // code block
        break;
      default:
      // code block
    }
    return this.create(createEmailDto);
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
    Object.assign(email, updateEmailDto);
    // Merge existing email with the updates to produce a full CreateEmailDTO for sending
    const createEmailDto: CreateEmailDTO = {
      subject: updateEmailDto.subject ?? email.subject,
      message: updateEmailDto.message ?? email.message,
      reciever: email.reciever,
      userId: updateEmailDto.userId ?? email.userId,
      name: updateEmailDto.name ?? email.name,
    };
    await this.send(createEmailDto);
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
