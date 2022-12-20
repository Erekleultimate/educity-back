import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUse(email: string, password: string): Promise<Object | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return { id: user.id, email: user.email } as IUser;
    }
    return null;
  }
}
