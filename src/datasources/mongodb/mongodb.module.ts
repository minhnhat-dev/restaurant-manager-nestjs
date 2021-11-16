import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Restaurant, RestaurantSchema } from './models/restaurant.model';
import { Category, CategorySchema } from './models/category.model';
import { optionalRequire } from '@nestjs/core/helpers/optional-require';
console.log('Category.name', Category.name);

const modelSchemas = [
  MongooseModule.forFeature([
    { name: Restaurant.name, schema: RestaurantSchema },
  ]),
  MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: 'mongodb+srv://restaurants:restaurants@cluster0.zhoqt.mongodb.net/restaurants_manager?retryWrites=true&w=majority',
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectionFactory: (connection: Record<any, any>): any => {
            connection.plugin(optionalRequire('mongoose-paginate-v2'));
            return connection;
          },
        };
      },
    }),
    ...modelSchemas,
  ],
  exports: [...modelSchemas],
})
export class MongodbModule {}
