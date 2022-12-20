import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('local/register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.createUser(email, password);
    const jwt = await this.authService.login({
      email: user.email,
      id: user.id,
    });
    return { data: jwt, meta: {} };
  }

  @UseGuards(AuthGuard('local'))
  @Post('local/login')
  async login(@Request() req) {
    const jwt = await this.authService.login(req.user);
    return { data: jwt, meta: {} };
  }
}
