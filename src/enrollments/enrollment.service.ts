import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  // Fetch all enrollments (for admin view)
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['user', 'class'] });
  }

  // Enroll a user in a class
  enroll(userId: number, classId: number): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create({ userId, classId });
    return this.enrollmentRepository.save(enrollment);
  }

  // Fetch all enrollments by class ID
  findByClassId(classId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { classId }, relations: ['user'] });
  }
}
