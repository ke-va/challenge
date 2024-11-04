import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { User } from 'src/users/user.entity';
import { Class } from 'src/classes/class.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  // Fetch all enrollments (for admin view)
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      relations: ['user', 'class'],
      select: {
        id: true,
        user: {
          name: true
        },
        class: {
          name: true
        }
      }
    })
  }

  // Enroll a user in a class
  async enroll(userId: number, classId: number): Promise<Enrollment> {
    // * fetch user and class with provided id's
    const fetchedUser = await this.userRepository.findOneBy({ id: userId });
    const fetchedClass = await this.classRepository.findOneBy({ id: classId })

    if (!fetchedUser || !fetchedClass) {
      return
    }

    const res = new Enrollment()
    res.user = fetchedUser
    res.class = fetchedClass
    const enrollment: Enrollment = this.enrollmentRepository.create(res);
    return this.enrollmentRepository.save(enrollment);
  }
}
