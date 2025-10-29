import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import type { Email } from './email.model';
import { CreateEmailDTO } from './create-email.dto';
import { FindOneParams } from './find-one.params';

@Controller('api/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  public findAll(): Email[] {
    return this.emailService.findAll();
  }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Email {
    // const task = this.taskService.findOne(params.id);
    // if (task) {
    //   return task;
    // }
    // throw new NotFoundException();
    // return this.findOneOrFail(params.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.findOneOrFail(params.id);
  }
  @Post()
  public create(@Body() createEmailDto: CreateEmailDTO) {
    return this.emailService.create(createEmailDto);
  }

  private findOneOrFail(id: string): Email {
    const email = this.emailService.findOne(id);

    if (email) {
      return email;
    }

    throw new NotFoundException();
  }
}
