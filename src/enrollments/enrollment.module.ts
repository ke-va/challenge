import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { UserService } from 'src/users/user.service';
import { ClassService } from 'src/classes/class.service';
import { Class } from 'src/classes/class.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Class, User])],
  providers: [EnrollmentService, UserService, ClassService],
  controllers: [EnrollmentController],
})
export class EnrollmentModule {}
