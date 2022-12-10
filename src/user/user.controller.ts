import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.mapper';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
