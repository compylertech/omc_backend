// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DataSource } from 'typeorm';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
//     .setTitle('CRM')
//     .setDescription('CRM API description')
//     .setVersion('1.0')
//     .addTag('CRM')
//     .build();
//   const documentFactory = () => SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, documentFactory);

//   const dataSource = app.get(DataSource);
//   try {
//     if (dataSource.isInitialized) {
//       console.log('Database connection established successfully!');
//     }

//   } catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1); // Exit the application if the connection fails
//   }

//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

// Create a global app reference
let app: INestApplication;

export default {
  async fetch(request: Request): Promise<Response> {
    if (!app) {
      // Create the NestJS application once
      app = await NestFactory.create(AppModule, { logger: false });
      await app.init();
    }

    // Parse the incoming request
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Manually map to NestJS routes
    const body = method !== 'GET' && method !== 'HEAD' ? await request.json() : null;

    // Call your NestJS application with the request
    const response = await app
      .getHttpAdapter().getInstance()
      .handle({ path, method, body, headers: [...request.headers] });

    // Convert the response back to Cloudflare's Response format
    return new Response(response.body, {
      status: response.status,
      headers: new Headers(response.headers),
    });
  },
};
