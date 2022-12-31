import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async find() {
    const courses = await this.courseService.findMany();
    return { data: courses, meta: { number: courses.length } };
  }

  @Post()
  @UseInterceptors(FileInterceptor('courseImage'))
  async createCourse(
    @Body('type') type: string,
    @Body('owner') owner: string,
    @Body('name') name: string,
    @Body('place') place: string,
    @Body('price') price: string,
    @UploadedFile() file,
  ) {
    const course = await this.courseService.create(
      type,
      place,
      name,
      price,
      owner,
      file,
    );
    return { data: course, meta: {} };
  }
}
