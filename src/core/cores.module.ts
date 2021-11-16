import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { PagingMiddleware } from './middlewares/paging.middleware';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class CoresModule implements NestModule {
  /**
   * Global Middleware
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer): any {
    /*
     * Common middleware:
     * - Helmet: Security http headers
     * - Compression: Gzip, deflate
     * - Rate limiting
     */
    consumer
      .apply(
        LoggerMiddleware,
        helmet(),
        compression(),
        rateLimit({
          windowMs: 1000, // 1s to reset limit
          max: 30, // limit each IP to 10 requests per windowMs
        }),
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(PagingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
    /*
     * JWT validate
     */
  }
}
