import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAutGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAutGuard)
  @Get()
  async find() {
    const users = await this.usersService.getAllUsers();
    return { data: users, meta: { number: users.length } };
  }

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.createUser(email, password);
    return { data: user, meta: {} };
  }

  @UseGuards(JwtAutGuard)
  @Get('me')
  async me(@Request() req) {
    return { data: req.user, meta: {} };
  }

  @UseGuards(JwtAutGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('userImage'))
  async uploadImage(@UploadedFile('file') file, @Request() req) {
    console.log(
      `upload image to s3 bucket and associate image link with the ${req.user.email}`,
    );
    return { data: file, meta: {} };
  }
}
