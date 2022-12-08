import { Injectable } from '@nestjs/common';
import { MysqlService } from 'nest-mysql2';

export interface Product {
  name: string;
  description: string;
  user_id: number;
  category_id: number;
  stock: number;
}

export interface ProductQuery {
  id: number;
  email: number;
  user_name: string;
  role: string;
  category_name: number;
  name: string;
  description: string;
  stock: number;
}

export interface Page {
  offset: number;
  limit: number;
}

@Injectable()
export class ProductMapper {
  constructor(private readonly myqslService: MysqlService) {}

  async insertProduct(product: Product): Promise<void> {
    const connection = await this.myqslService.getConnection();
    await connection.query('INSERT INTO product SET ?', product);
  }

  async deleteProduct(id: number): Promise<void> {
    const connection = await this.myqslService.getConnection();
    await connection.query(
      'UPDATE product SET is_delete = true WHERE id = ?',
      id,
    );
  }

  async findProductById(id: number): Promise<ProductQuery> {
    const connection = await this.myqslService.getConnection();
    const [rows] = await connection.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.stock, 
        c.name as category_name,
        u.email, 
        u.name as user_name, 
        u.role 
      FROM product p 
      inner join category c on p.category_id = c.id 
      inner join user u on p.user_id = u.id
      where p.id = ? and is_delete = false`,
      [id],
    );
    return rows[0];
  }

  async findProductsByEamil(email: string): Promise<ProductQuery[]> {
    const connection = await this.myqslService.getConnection();
    const [rows] = await connection.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.stock, 
        c.name as category_name,
        u.email, 
        u.name as user_name, 
        u.role 
      FROM product p 
      inner join category c on p.category_id = c.id 
      inner join user u on p.user_id = u.id
      where u.email = ? and is_delete = false`,
      [email],
    );
    return rows;
  }

  async findPage(page: Page): Promise<ProductQuery[]> {
    const connection = await this.myqslService.getConnection();
    const [rows] = await connection.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.stock, 
        c.name as category_name,
        u.email, 
        u.name as user_name, 
        u.role 
      FROM product p 
      inner join category c on p.category_id = c.id 
      inner join user u on p.user_id = u.id
      where p.is_delete = false
      limit ?, ?`,
      [page.offset, page.limit],
    );
    return rows;
  }
}
