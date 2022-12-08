import { Injectable } from '@nestjs/common';
import { Page, Product, ProductMapper, ProductQuery } from './product.mapper';

@Injectable()
export class ProductService {
  constructor(private readonly productMapper: ProductMapper) {}

  async createProduct(product: Product): Promise<void> {
    return this.productMapper.insertProduct(product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productMapper.deleteProduct(id);
  }

  async findProductById(id: number): Promise<ProductQuery> {
    return this.productMapper.findProductById(id);
  }

  async findProductsByEamil(email: string): Promise<ProductQuery[]> {
    return this.productMapper.findProductsByEamil(email);
  }

  async findPage(page: Page): Promise<ProductQuery[]> {
    return this.productMapper.findPage(page);
  }
}
