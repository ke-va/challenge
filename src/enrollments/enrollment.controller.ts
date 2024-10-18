import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // Admin: Get all enrollments
  @Get()
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentService.findAll();
  }

  // User: Enroll in a class
  @Post()
  enroll(@Body('userId') userId: number, @Body('classId') classId: number): Promise<Enrollment> {
    return this.enrollmentService.enroll(userId, classId);
  }

  // Admin: Get enrollments for a specific class
  @Get('class/:classId')
  findByClassId(@Param('classId') classId: number): Promise<Enrollment[]> {
    return this.enrollmentService.findByClassId(classId);
  }
}
