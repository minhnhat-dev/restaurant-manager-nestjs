import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

async function bootstrap() {
  /* Init app */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  /* CORS */
  app.enableCors();

  /* Global prefix version */
  let basePath = config.get('app.basePath');
  if (!basePath) basePath = '/';
  if (basePath != '/' && basePath.charAt(0) != '/')
    basePath = '/' + basePath + '/';
  app.setGlobalPrefix(basePath + 'api/v1');

  /* Global pipes transform */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /* Proxy */
  app.set('trust proxy', 1);

  /* Swagger configurations */
  if (config.get('node.env') !== 'production') {
    basePath = basePath.replace(/^\//g, '');
    new Swagger(app).setup(basePath);
  }
  await app.listen(3000);
}

class Swagger {
  constructor(private app: NestExpressApplication) {}
  /* Register more swagger api here */
  setup(basePath): void {
    /* Main API */
    this.register(undefined, `${basePath}api`);
  }

  register(
    extraModules?: any[],
    path?: string,
    title?: string,
    description?: string,
    version?: string,
  ): void {
    const mainModules = [AppModule, CategoryModule, RestaurantsModule];

    if (extraModules) {
      mainModules.push(...extraModules);
    }

    const siteTitle = title || 'Restaurant Swagger APIs';
    const options = new DocumentBuilder()
      .setTitle(siteTitle)
      .setDescription(description || 'Restaurant APIs description')
      .setVersion(version || '1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, options, {
      include: mainModules,
    });
    SwaggerModule.setup(path || 'api', this.app, document, {
      customSiteTitle: siteTitle,
    });
  }
}

bootstrap();
