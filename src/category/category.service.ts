import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('category') private readonly categoryModel: Model<ICategory>,
  ) {}

  async findMany() {
    return this.categoryModel.find().exec();
  }
}
