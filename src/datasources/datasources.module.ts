import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [],
  providers: [],
  exports: [MongodbModule],
})
export class DataSourcesModule {}
