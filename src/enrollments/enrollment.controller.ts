import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnrollDto } from './dto/enroll.dto';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // Admin: Get all enrollments
  @Get()
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentService.findAll();
  }

  // User: Enroll in a class
  @Post('enroll')
  @ApiResponse({ status: 200, description: 'User is succesfully enrolled' })
  async enroll(@Body() data: EnrollDto): Promise<Enrollment> {
    return this.enrollmentService.enroll(data.userId, data.classId);
  }
}
