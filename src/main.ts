import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('CRM API description')
    .setVersion('1.0')
    .addTag('CRM')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const dataSource = app.get(DataSource);
  try {
    if (dataSource.isInitialized) {
      console.log('Database connection established successfully!');
    }

  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the application if the connection fails
  }

  await app.listen(3000);
}
bootstrap();
