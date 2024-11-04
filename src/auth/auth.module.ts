import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // For accessing UserService for login/registration
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtModule,
    PassportModule
  ],
  controllers: [AuthController],
})
export class AuthModule {}
