import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '../../datasources/mongodb/models/category.model';
import { CreateCategoryDto } from '../dto/createCategory.dto';
import { UpdateCategoryDto } from '../dto/updateCategory.dto';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryValidator {
  constructor(private readonly categoryService: CategoryService) {}

  async validateCreate(createCategoryDto: CreateCategoryDto) {
    const { code, name, level = 1, parent } = createCategoryDto;

    const countCode = await this.categoryService.countWithCondition({ code });
    if (countCode) throw new BadRequestException('Code already exists.');

    const countName = await this.categoryService.countWithCondition({ name });
    if (countName) throw new BadRequestException('Name already exists.');

    if (level > 1 && !parent) {
      throw new BadRequestException('Parent id is required.');
    }

    if (parent) {
      const parentFound: Category = await this.categoryService.detail(parent);

      if (!parentFound) {
        throw new NotFoundException('Parent id is not found.');
      }

      const { level: parentLevel } = parentFound;

      if (level - 1 !== parentLevel) {
        throw new BadRequestException('Level invalid.');
      }
    }
  }

  async validateUpdate(updateCategoryDto: UpdateCategoryDto) {
    const { code, name, level, parent } = updateCategoryDto;

    if (code) {
      const countCode = await this.categoryService.countWithCondition({ code });
      if (countCode) throw new BadRequestException('Code already exists.');
    }

    if (name) {
      const countName = await this.categoryService.countWithCondition({ name });
      if (countName) throw new BadRequestException('Name already exists.');
    }

    if (level) {
      if (level > 1 && !parent) {
        throw new BadRequestException('Parent id is required.');
      }
    }

    if (parent) {
      const parentFound: Category = await this.categoryService.detail(parent);

      if (!parentFound) {
        throw new NotFoundException('Parent id is not found.');
      }

      const { level: parentLevel } = parentFound;

      if (level - 1 !== parentLevel) {
        throw new BadRequestException('Level invalid.');
      }
    }
  }
}
