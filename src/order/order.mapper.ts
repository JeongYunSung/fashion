import { Injectable } from '@nestjs/common';
import { MysqlService } from 'nest-mysql2';

export interface OrderQuery {
  id: number;
  product_name: string;
  quantity: number;
}

export interface Order {
  user_id: number;
  order_id: number;
  quantity: number;
}

@Injectable()
export default class OrderMapper {
  constructor(private readonly mysqlService: MysqlService) {}

  async insertOrder(order: Order): Promise<void> {
    const connection = await this.mysqlService.getConnection();
    await connection.query('INSERT INTO orders set', [order]);
  }

  async cancelOrder(orderId: number, userId: number): Promise<void> {
    const connection = await this.mysqlService.getConnection();
    await connection.query(
      'update orders set is_cancel = true WHERE id = ? and user_id',
      [orderId, userId],
    );
  }

  async findAllByUserId(userId: number): Promise<OrderQuery[]> {
    const connection = await this.mysqlService.getConnection();
    const [rows] = await connection.query(
      `
      SELECT
        o.id,
        p.name as product_name,
        o.quantity
      FROM orders o
      inner join product p on o.product_id = p.id
      where o.user_id = ?`,
      [userId],
    );
    return rows;
  }
}
