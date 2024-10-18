import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Fetch all users
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find user by ID
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // Create new user
  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Delete user by ID
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Find user by email (for login)
  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
