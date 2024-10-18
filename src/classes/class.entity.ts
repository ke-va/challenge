import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Sport } from 'src/sports/sport.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Name of the class (e.g., "Basketball Beginners")

  @Column()
  description: string;

  @Column('time')
  duration: string;  // e.g., "01:30" for 1 hour 30 minutes

  @Column()
  weekSchedule: string;  // e.g., "Monday, Wednesday, Friday"

  @Column('time')
  startTime: string;  // e.g., "18:00" for 6 PM

  @ManyToOne(() => Sport, (sport) => sport.classes)
  sport: Sport;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.class)
  enrollments: Enrollment[];
}
