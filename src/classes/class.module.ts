import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { UserService } from 'src/users/user.service';
import { EnrollmentService } from 'src/enrollments/enrollment.service';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User, Enrollment])],
  providers: [ClassService, UserService, EnrollmentService],
  controllers: [ClassController],
  exports: [ClassService]
})
export class ClassModule {}
