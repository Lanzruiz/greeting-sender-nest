import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [EmailModule, UserModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
