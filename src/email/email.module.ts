import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email]),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
