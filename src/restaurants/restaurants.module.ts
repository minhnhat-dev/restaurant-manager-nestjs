import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { DataSourcesModule } from '../datasources/datasources.module';
import { RestaurantValidator } from './validators/restaurant.validator';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [DataSourcesModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantValidator, CategoryService],
})
export class RestaurantsModule {}
