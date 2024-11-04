import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Sport } from 'src/sports/sport.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('classes')
export class Class {
  @ApiProperty({
    example: 1,
    required: true,
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Basketball Beginners',
    required: true,
  })
  @Column()
  name: string;  // Name of the class (e.g., "Basketball Beginners")

  @ApiProperty({
    example: 'Learn Basketball',
    required: true
  })
  @Column()
  description: string;

  @ApiProperty({
    example: '01:30',
    required: true
  })
  @Column('time')
  duration: string;  // e.g., "01:30" for 1 hour 30 minutes

  @ApiProperty({
    example: 'Monday, Wednesday, Friday',
    required: true
  })
  @Column()
  week_schedule: string;  // e.g., "Monday, Wednesday, Friday"

  @ApiProperty({
    example: '18:00',
    required: true
  })
  @Column('time')
  start_time: string;  // e.g., "18:00" for 6 PM

  @ApiProperty({
    example: 'sport id',
    required: true
  })
  @ManyToOne(() => Sport, (sport) => sport.classes)
  sport: Sport;

  @ApiProperty({
    example: 'enrollment id'
  })
  @OneToMany(() => Enrollment, (enrollment) => enrollment.class)
  enrollments: Enrollment[];
}
