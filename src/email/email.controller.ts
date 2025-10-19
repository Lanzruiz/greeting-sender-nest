import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './email.model';
import { CreateEmailDTO } from './create-email.dto';

@Controller('api/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get()
  public findAll(): Email[] {
    return this.emailService.findAll();
  }
  @Post()
  public create(@Body() createEmailDto: CreateEmailDTO) {
    return this.emailService.create(createEmailDto);
  }
}
