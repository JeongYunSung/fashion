import { Injectable } from '@nestjs/common';
import { MysqlService } from 'nest-mysql2';

export interface Item {
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface ItemQuery {
  category_name: number;
  name: string;
  quantity: number;
}

@Injectable()
export class CartMapper {
  constructor(private readonly myqslService: MysqlService) {}

  async insertItem(item: Item): Promise<void> {
    const connection = await this.myqslService.getConnection();
    await connection.query('INSERT INTO cart SET ?', item);
  }

  async findItems(userId: number): Promise<ItemQuery[]> {
    const connection = await this.myqslService.getConnection();
    const [rows] = await connection.query(
      `select 
        c.quantity, 
        p.name, 
        p.category_name 
      from cart c
      inner join product p on c.product_id = p.id
      where c.user_id = ? and is_delete = false`,
      [userId],
    );

    return rows;
  }

  async clearItems(userId: number): Promise<void> {
    const connection = await this.myqslService.getConnection();
    await connection.query(
      'update cart set is_delete = true WHERE user_id = ?',
      [userId],
    );
  }
}
