import { Injectable } from '@nestjs/common';
import { MysqlService } from 'nest-mysql2';

export interface Category {
  id: number;
  name: string;
}

@Injectable()
export class CategoryMapper {
  constructor(private readonly mysqlService: MysqlService) {}

  async getCategory(id: number): Promise<Category> {
    const conn = await this.mysqlService.getConnection();
    const [rows] = await conn.query('SELECT * FROM category where id = ?', [
      id,
    ]);
    return rows[0];
  }

  async getCategories(): Promise<Category[]> {
    const conn = await this.mysqlService.getConnection();
    const [rows] = await conn.query('SELECT * FROM category');
    return rows;
  }
}
