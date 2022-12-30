import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('courseImage'))
  async createCourse(
    @Body('type') type: string,
    @Body('place') place: string,
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('owner') owner: string,
    @UploadedFile('file') file: object,
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
