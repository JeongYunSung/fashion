import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Category, CategoryMapper } from './category.mapper';

@Controller('categories')
export class CategoryController {
  @Inject()
  private readonly categoryMapper: CategoryMapper;

  @Get('/:id')
  async getCategory(@Param('id') id: number): Promise<Category> {
    return await this.categoryMapper.getCategory(id);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryMapper.getCategories();
  }
}
