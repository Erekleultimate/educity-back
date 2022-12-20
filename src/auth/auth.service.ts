import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUse(email: string, password: string): Promise<Object | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return { id: user.id, email: user.email } as IUser;
    }
    return null;
  }

  async login(user: { id: string; email: string }) {
    const payload = { email: user.email, sub: user.id };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
