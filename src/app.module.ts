import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CoresModule } from './core/cores.module';
import { DataSourcesModule } from './datasources/datasources.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [CoresModule, RestaurantsModule, DataSourcesModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
