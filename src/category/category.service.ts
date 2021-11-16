import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../datasources/mongodb/models/category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getList(query: Record<string, any>): Promise<any> {
    const { limit, skip, searchText, level, sortObject, select } = query;
    const conditions: any = {};

    if (level) conditions.level = level;

    if (searchText) {
      conditions.$or = [
        { name: { $regex: searchText.trim(), $options: 'i' } },
        { code: { $regex: searchText.trim(), $options: 'i' } },
      ];
    }

    const [categories, total] = await Promise.all([
      this.categoryModel
        .find(conditions)
        .select(select)
        .sort(sortObject)
        .skip(skip)
        .limit(limit),
      this.categoryModel.countDocuments(conditions),
    ]);

    return { categories, total };
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await new this.categoryModel(createCategoryDto).save();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async detail(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove(id);
  }

  async countCategories(): Promise<number> {
    return await this.categoryModel.count({}).exec();
  }

  async countWithCondition(condition: Record<string, any>): Promise<number> {
    return await this.categoryModel.count(condition).exec();
  }
}
