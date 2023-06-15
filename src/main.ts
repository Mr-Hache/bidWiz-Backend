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
    await app.listen(3000, '0.0.0.0');
    console.log('Server started. Application is running');
  } catch (error) {
    console.error('Error while starting the application', error);
  }
}


bootstrap();