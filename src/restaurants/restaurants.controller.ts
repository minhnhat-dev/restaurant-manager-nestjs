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
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';
import { QueryRestaurantDto } from './dto/queryRestaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '../core/interceptors/coreTransform.interceptor';
import { RestaurantsService } from './restaurants.service';
import { CoreResponse } from '../core/interfaces/coreResponse.interface';
import { DefaultListQuery } from '../core/decorators/defaultListQuery.decorator';
import { RestaurantValidator } from './validators/restaurant.validator';

@ApiTags('Restaurant')
@Controller('restaurants')
@UseInterceptors(CoreTransformInterceptor)
export class RestaurantsController {
  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly restaurantValidator: RestaurantValidator,
  ) {}

  @Get('/')
  @DefaultListQuery()
  async getList(@Query() query: QueryRestaurantDto): Promise<CoreResponse> {
    const { restaurants, total } = await this.restaurantService.getList(query);
    const data = {
      items: restaurants,
      total,
    };
    return { data };
  }

  @Post('/')
  async create(
    @Body() restaurantDto: CreateRestaurantDto,
  ): Promise<CoreResponse> {
    await this.restaurantValidator.validateCreate(restaurantDto);
    const result = await this.restaurantService.create(restaurantDto);
    return { data: result };
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<CoreResponse> {
    const result = await this.restaurantService.detail(id);
    return { data: result };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<CoreResponse> {
    await this.restaurantValidator.validateUpdate(updateRestaurantDto);
    const result = await this.restaurantService.update(id, updateRestaurantDto);
    return { data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CoreResponse> {
    const result = await this.restaurantService.delete(id);
    return { status: true };
  }
}
