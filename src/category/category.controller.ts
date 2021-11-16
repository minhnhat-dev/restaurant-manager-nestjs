import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CoreResponse } from '../core/interfaces/coreResponse.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { QueryCategoryDto } from './dto/queryCategory.dto';
import { CoreTransformInterceptor } from '../core/interceptors/coreTransform.interceptor';
import { CategoryValidator } from './validators/category.validator';
import { DefaultListQuery } from '../core/decorators/defaultListQuery.decorator';

@ApiTags('Category')
@Controller('categories')
@UseInterceptors(CoreTransformInterceptor)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryValidator: CategoryValidator,
  ) {}

  @Get('/')
  @DefaultListQuery()
  async getList(@Query() query: QueryCategoryDto): Promise<CoreResponse> {
    const { categories, total } = await this.categoryService.getList(query);
    const data = {
      items: categories,
      total,
    };
    return { data };
  }

  @Post('/')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CoreResponse> {
    await this.categoryValidator.validateCreate(createCategoryDto);
    const result = await this.categoryService.create(createCategoryDto);
    return { data: result };
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<CoreResponse> {
    const result = await this.categoryService.detail(id);
    return { data: result };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CoreResponse> {
    await this.categoryValidator.validateUpdate(updateCategoryDto);
    const result = await this.categoryService.update(id, updateCategoryDto);
    return { data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CoreResponse> {
    const result = await this.categoryService.delete(id);
    return { status: true };
  }
}
