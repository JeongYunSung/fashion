import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryMapper } from './category.mapper';

@Module({
  providers: [CategoryMapper, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
