import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAutGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async find() {
    const courses = await this.courseService.findMany();
    return { data: courses, meta: { number: courses.length } };
  }

  @UseGuards(JwtAutGuard)
  @Post()
  @UseInterceptors(FileInterceptor('courseImage'))
  async createCourse(
    @Body('category') category: string,
    @Body('owner') owner: string,
    @Body('name') name: string,
    @Body('place') place: string,
    @Body('price') price: string,
    @UploadedFile() file,
  ) {
    const course = await this.courseService.create(
      category,
      place,
      name,
      price,
      owner,
      file,
    );
    return { data: course, meta: {} };
  }
}
