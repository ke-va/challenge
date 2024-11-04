import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Class } from 'src/classes/class.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('enrollments')
export class Enrollment {
  @ApiProperty({
    example: 1,
    required: true,
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments)
  user: User;

  @ManyToOne(() => Class, (sportClass) => sportClass.enrollments)
  class: Class;
}
