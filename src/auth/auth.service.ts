import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUse(email: string, password: string): Promise<Object | null> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw new UnauthorizedException();
      }
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
