import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication, version:any): any {
  const logger: Logger = new Logger('Swagger');
  const swaggerEndpoint = '/swagger';

  const options = new DocumentBuilder()
    .setTitle('API Service')
    .setDescription('API Service documentation')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app, '1.0.0');
  await app.listen(3009);
}
bootstrap();
