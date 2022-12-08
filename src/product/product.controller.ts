import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from './product.mapper';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.findProductById(id);
  }

  @Get()
  async getPage(@Query('page') page = 1, @Query('size') size = 10) {
    page -= 1;
    return this.productService.findPage({ offset: page, limit: size });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
