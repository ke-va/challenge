import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(name: string, email: string, password: string, role?: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.roles = role;

    await this.userService.create(user);
    return { message: 'User registered successfully' };
  }

  // Validate the user during login
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  }

  // Login the user and return the JWT token
  async login(user: any) {
    console.log('servis', process.env.JWT_SECRET)
    const payload = { email: user.email, role: user.role };
    return {
        access_token: this.jwtService.sign(payload, { secret: 'secretsecretsecret' }),
    };
  }
}
