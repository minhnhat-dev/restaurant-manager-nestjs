import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DataSourcesModule } from '../datasources/datasources.module';
import { CategoryValidator } from './validators/category.validator';

@Module({
  imports: [DataSourcesModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryValidator],
})
export class CategoryModule {}
