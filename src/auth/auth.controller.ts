import { Controller, Post, Body, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User is created.'})
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData.name, userData.email, userData.password);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User is logged in' })
  async login(@Body() userData: LoginDto, @Req() request: Request) {
    console.log('ty san')
    const user = await this.authService.validateUser(userData.email, userData.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    request['user'] = user
    console.log('kontroler', process.env.JWT_SECRET_KEY)
    return this.authService.login(user);
  }
}
