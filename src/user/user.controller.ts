import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.mapper';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    return this.userService.getUser(email);
  }

  @Post()
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
