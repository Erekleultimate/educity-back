import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { S3Module } from 'src/s3/s3.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './course.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'course', schema: CourseSchema }]),
    UsersModule,
    S3Module,
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
