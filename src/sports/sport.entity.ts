import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from 'src/classes/class.entity';

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // e.g., "Basketball", "Football"

  @Column()
  description: string;

  @OneToMany(() => Class, (sportClass) => sportClass.sport)
  classes: Class[];
}
