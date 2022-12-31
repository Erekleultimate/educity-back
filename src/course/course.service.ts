import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service } from 'src/s3/s3.service';
import { UsersService } from 'src/users/users.service';
import { ICourse } from './course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('course') private readonly courseModel: Model<ICourse>,
    private readonly userService: UsersService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    type: string,
    place: string,
    name: string,
    price: string,
    owner: string,
    file: object,
  ) {
    if (!type || !place || !name || !price || !owner || !file)
      throw new NotAcceptableException();
    const user = await this.userService.findOne(owner);
    const imageLink = await this.s3Service.uploadFile(file);
    return this.courseModel.create({
      type,
      place,
      name,
      price,
      owner: user,
      img: imageLink,
    });
  }

  async findMany() {
    return this.courseModel.find().exec();
  }
}
