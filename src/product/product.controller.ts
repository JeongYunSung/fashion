import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './product.mapper';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() product: Product, @Req() req) {
    if (req.user.role !== 'admin') {
      return { message: '관리자만 접근 가능합니다.' };
    }
    product.user_id = req.user.id;
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
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin') {
      return { message: '관리자만 접근 가능합니다.' };
    }
    return this.productService.deleteProduct(id);
  }
}
