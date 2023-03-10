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
import { S3Service } from 'src/s3/s3.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
  ) {}

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
    const user = await this.usersService.findOne(req.user.email);
    return {
      data: {
        email: user.email,
        id: user.id,
        image: user.image,
        token: req.user.token,
      },
      meta: {},
    };
  }

  @UseGuards(JwtAutGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('userImage'))
  async uploadUserImage(@UploadedFile('file') file: object, @Request() req) {
    const imageLink = await this.s3Service.uploadFile(file);
    await this.usersService.updateUser(req.user.email, null, imageLink);
    return { data: imageLink, meta: {} };
  }
}
