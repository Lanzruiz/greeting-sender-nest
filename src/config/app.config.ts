import { registerAs } from '@nestjs/config';

export interface AppConfig {
  messagePrefix: string;
  emailServer: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    messagePrefix: process.env.APP_MESSAGE_PREFIX ?? 'Hello ',
    emailServer: process.env.EMAIL_SERVER ?? 'localhost',
  }),
);
