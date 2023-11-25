import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const error = errors
          .map((error) => {
            return Object.values(error.constraints);
          })
          .join(', ');
        const message = `Validation failed`;
        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message,
            error,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Server is listening in port ${PORT}`);
  });
}
bootstrap();
