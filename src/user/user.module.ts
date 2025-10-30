import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from 'src/config/app.config';
import { appConfigSchema } from 'src/config/config.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
