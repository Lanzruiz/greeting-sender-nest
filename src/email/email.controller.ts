import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import type { Email } from './email.model';
import { CreateEmailDTO } from './create-email.dto';
import { FindOneParams } from './find-one.params';
import { UpdateEmailStatusDTO } from './update-email-status.dto';
import { WrongEmailStatusException } from './execptions/wrong-email-status.exception';

@Controller('api/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  public findAll(): Email[] {
    return this.emailService.findAll();
  }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Email {
    return this.findOneOrFail(params.id);
  }
  @Post()
  public create(@Body() createEmailDto: CreateEmailDTO) {
    return this.emailService.create(createEmailDto);
  }

  @Patch('/:id')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateEmailDto: UpdateEmailStatusDTO,
  ) {
    const email = this.findOneOrFail(params.id);
    // return this.taskService.updateTask(task, updateTaskDto);
    try {
      return this.emailService.updateEmail(email, updateEmailDto);
    } catch (error) {
      if (error instanceof WrongEmailStatusException) {
        throw new BadRequestException([error.message]);
      }
      throw error;
    }
  }

  private findOneOrFail(id: string): Email {
    const email = this.emailService.findOne(id);

    if (email) {
      return email;
    }

    throw new NotFoundException();
  }
}
