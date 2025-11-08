import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [UserModule, EmailModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
