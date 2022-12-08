import { Controller, Get, Inject } from '@nestjs/common';
import { Category } from './category.mapper';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }
}
