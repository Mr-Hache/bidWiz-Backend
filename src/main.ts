import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  try {
    console.log('Creating Nest application...');
    const app = await NestFactory.create(AppModule);
    console.log('Nest application created.');

    app.enableCors()
    app.useGlobalPipes(new ValidationPipe())

    console.log('Starting server...');
    await app.listen(3000);
    console.log('Server started. Application is running on: http://localhost:3000');
  } catch (error) {
    console.error('Error while starting the application', error);
  }
}


bootstrap();