import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from '../dto/createRestaurant.dto';
import { UpdateRestaurantDto } from '../dto/updateRestaurant.dto';
import { RestaurantsService } from '../restaurants.service';
import { CategoryService } from '../../category/category.service';

@Injectable()
export class RestaurantValidator {
  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly categoryService: CategoryService,
  ) {}

  async validateCreate(createRestaurantDto: CreateRestaurantDto) {
    const { name, category } = createRestaurantDto;

    const countName = await this.restaurantService.countWithCondition({ name });
    if (countName) throw new BadRequestException('Name already exists.');

    const countCategory = await this.categoryService.countWithCondition({
      _id: category,
    });

    if (!countCategory) throw new NotFoundException('Category not found.');
  }

  async validateUpdate(updateRestaurantDto: UpdateRestaurantDto) {
    const { name, category } = updateRestaurantDto;

    if (name) {
      const countName = await this.restaurantService.countWithCondition({
        name,
      });
      if (countName) throw new BadRequestException('Name already exists.');
    }

    if (category) {
      const countCategory = await this.categoryService.countWithCondition({
        _id: category,
      });

      if (!countCategory) throw new NotFoundException('Category not found.');
    }
  }
}
