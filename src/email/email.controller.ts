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
import { Email } from './email.entity';
import { CreateEmailDTO } from './create-email.dto';
import { FindOneParams } from './find-one.params';
import { UpdateEmailDto } from './update-email.dto';
import { WrongEmailStatusException } from './execptions/wrong-email-status.exception';

@Controller('api/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  public findAll(): Promise<Email[]> {
    return this.emailService.findAll();
  }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Promise<Email> {
    return this.findOneOrFail(params.id);
  }
  @Post()
  public create(@Body() createEmailDto: CreateEmailDTO) {
    return this.emailService.create(createEmailDto);
  }

  @Patch('/:id')
  public async updateTask(
    @Param() params: FindOneParams,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    const email = await this.findOneOrFail(params.id);
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

  private async findOneOrFail(id: string): Promise<Email> {
    const email = await this.emailService.findOne(id);

    if (!email) {
      throw new NotFoundException();
    }

    return email;
  }
}
