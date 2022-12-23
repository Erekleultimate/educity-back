import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

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
    const { jwt } = await this.authService.login({
      email: user.email,
      id: user.id,
    });
    return {
      data: { email: user.email, id: user.id, image: user.image, token: jwt },
      meta: {},
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async login(@Request() req) {
    const { jwt } = await this.authService.login(req.user);
    const user = await this.userService.findOne(req.user.email);
    return {
      data: { email: user.email, id: user.id, image: user.image, token: jwt },
      meta: {},
    };
  }
}
