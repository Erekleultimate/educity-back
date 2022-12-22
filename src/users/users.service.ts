import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private async hashPassword(password: string) {
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
    const user = await this.findOne(email);
    if (user) throw new NotAcceptableException();
    const hashedPassword = await this.hashPassword(password);
    return this.usersModel.create({
      email,
      password: hashedPassword,
      image: '',
    });
  }

  async findOne(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne({ email }).exec();
    return user;
  }

  async uploadUserImage(email: string, image: object): Promise<IUser> {
    const imageLink = 'imageLink'; // TODO: upload image to amazon s3 bucket and asign link string
    const user = await this.updateUser(email, undefined, imageLink);
    return user;
  }

  async updateUser(
    email: string,
    password: string,
    image: string,
  ): Promise<IUser> {
    const user = await this.findOne(email);
    if (user.email !== email) user.email = email;
    if (password) user.password = await this.hashPassword(password);
    if (image) user.image = image;
    await user.save();
    return user;
  }
}
