import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { ClassService } from 'src/classes/class.service';
import { EnrollmentService } from 'src/enrollments/enrollment.service';
import { Class } from 'src/classes/class.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Class, Enrollment])],
  providers: [UserService, JwtService, ClassService, EnrollmentService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
