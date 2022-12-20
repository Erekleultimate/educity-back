import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find() {
    const users = await this.usersService.getAllUsers();
    return { data: users, meta: {} };
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.usersService.findOne(email);
    return { data: user, meta: {} };
  }

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.createUser(email, password);
    return { data: user, meta: {} };
  }
}
