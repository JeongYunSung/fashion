import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Item } from './cart.mapper';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getItems(@Query('user_id') userId: number) {
    return this.cartService.getItems(userId);
  }

  @Post()
  async addItem(@Body() item: Item) {
    await this.cartService.addItem(item);
  }

  @Delete('clear')
  async clearItems() {
    await this.cartService.clearItems(1);
  }
}
