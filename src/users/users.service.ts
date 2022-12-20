import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly usersModel: Model<IUser>,
  ) {}

  async getAllUsers() {
    const users = await this.usersModel.find().exec();
    return users;
  }

  async createUser(email: string, password: string) {
    if (!email || !password) throw new NotAcceptableException();
    return this.usersModel.create({ email, password });
  }

  async findOne(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne({ email }).exec();
    return user;
  }
}
