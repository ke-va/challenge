import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  // Fetch all classes
  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  // Find class by ID
  findOne(id: number): Promise<Class> {
    return this.classRepository.findOneBy({ id });
  }

  // Create a new class
  create(classData: Class): Promise<Class> {
    return this.classRepository.save(classData);
  }

  // Update class details
  update(id: number, updatedClass: Partial<Class>): Promise<Class> {
    return this.classRepository.save({ ...updatedClass, id });
  }

  // Delete class
  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
