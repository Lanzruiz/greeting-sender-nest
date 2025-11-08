import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import serverlessExpress from '@codegenie/serverless-express';
// import { Callback, Context, Handler } from 'aws-lambda';
// import { AppModule } from './app.module';

// let server: Handler;

// async function bootstrap(): Promise<Handler> {
//   const app = await NestFactory.create(AppModule);
//   await app.init();

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const expressApp = app.getHttpAdapter().getInstance();
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return server(event, context, callback);
// };
