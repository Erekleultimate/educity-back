import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      email: 'datogio@gmail.com',
      password: 'password',
    },
  ];

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  constructor(
    @InjectModel('users') private readonly usersModel: Model<IUser>,
  ) {}

  async getAllUsers() {
    const users = await this.usersModel.find().exec();
    return users;
  }

  async createUser(email: string, password: string) {
    if (!email || !password) throw new NotAcceptableException();
    const hashedPassword = await this.hashPassword(password);
    return this.usersModel.create({ email, password: hashedPassword });
  }

  async findOne(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne({ email }).exec();
    return user;
  }
}
