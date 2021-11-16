import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from '../datasources/mongodb/models/restaurant.model';
import { Category } from '../datasources/mongodb/models/category.model';
import { isIn, isNotEmpty } from 'class-validator';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getList(query: Record<string, any>): Promise<any> {
    console.log('query', query);

    const {
      limit,
      skip,
      searchText,
      categoryIds = '',
      sortObject,
      searchCategory = '',
      select,
    } = query;

    const conditions: any = {};
    let listIds = [];

    if (categoryIds) {
      const ids = categoryIds.split(',').map((categoryId) => categoryId.trim());
      listIds = [...listIds, ...ids];
    }

    if (searchCategory) {
      const conditionCategory = {
        $or: [
          { name: { $regex: searchCategory.trim(), $options: 'i' } },
          { code: { $regex: searchCategory.trim(), $options: 'i' } },
        ],
      };

      const categories = await this.categoryModel
        .find(conditionCategory)
        .select('_id');

      if (categories.length) {
        const ids = categories.map((item) => item._id);
        listIds = [...listIds, ...ids];
      }
    }

    if (searchText) {
      conditions.$or = [{ name: { $regex: searchText.trim(), $options: 'i' } }];
    }

    if (listIds.length) {
      conditions.category = { $in: listIds };
    }

    const [restaurants, total] = await Promise.all([
      this.restaurantModel
        .find(conditions)
        .select(select)
        .sort(sortObject)
        .skip(skip)
        .limit(limit),
      this.restaurantModel.countDocuments(conditions),
    ]);

    return { restaurants, total };
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = await new this.restaurantModel(
      createRestaurantDto,
    ).save();
    return this.restaurantModel
      .findById(newRestaurant._id)
      .populate(['category']);
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
      .populate(['category'])
      .exec();
  }

  async detail(id: string): Promise<Restaurant> {
    return this.restaurantModel.findById(id).populate(['category']);
  }

  async delete(id: string): Promise<Restaurant> {
    return this.restaurantModel.findByIdAndRemove(id);
  }

  async countRestaurants(): Promise<number> {
    return await this.restaurantModel.count({}).exec();
  }

  async countWithCondition(condition: Record<string, any>): Promise<number> {
    return await this.restaurantModel.count(condition).exec();
  }
}
