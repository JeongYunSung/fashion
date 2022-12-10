import { Injectable } from '@nestjs/common';
import OrderMapper, { Order, OrderQuery } from './order.mapper';

@Injectable()
export class OrderService {
  constructor(private readonly orderMapper: OrderMapper) {}

  async createOrder(order: Order): Promise<void> {
    await this.orderMapper.insertOrder(order);
  }

  async cancelOrder(orderId: number): Promise<void> {
    await this.orderMapper.cancelOrder(orderId);
  }

  async findAll(): Promise<OrderQuery[]> {
    return this.orderMapper.findAll();
  }
}
