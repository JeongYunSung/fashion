import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Order, OrderQuery } from './order.mapper';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: Order): Promise<void> {
    await this.orderService.createOrder(order);
  }

  @Delete(':id')
  async cancelOrder(@Param('id') orderId: number): Promise<void> {
    await this.orderService.cancelOrder(orderId);
  }

  @Get()
  async findAll(): Promise<OrderQuery[]> {
    return this.orderService.findAll();
  }
}
