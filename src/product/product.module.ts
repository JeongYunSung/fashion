import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductMapper } from './product.mapper';

@Module({
  providers: [ProductMapper, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
