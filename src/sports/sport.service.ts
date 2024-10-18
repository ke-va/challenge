import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
  ) {}

  // Fetch all sports
  findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  // Fetch sport by ID
  findOne(id: number): Promise<Sport> {
    return this.sportRepository.findOneBy({ id });
  }

  // Create a new sport
  create(sport: Sport): Promise<Sport> {
    return this.sportRepository.save(sport);
  }

  // Update sport
  update(id: number, updatedSport: Partial<Sport>): Promise<Sport> {
    return this.sportRepository.save({ ...updatedSport, id });
  }

  // Delete sport
  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}
