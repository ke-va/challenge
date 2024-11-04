import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from 'src/classes/class.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sports')
export class Sport {
  @ApiProperty({
    example: 1,
    required: true,
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Basketball",
    required: true
  })
  @Column()
  name: string;  // e.g., "Basketball", "Football"

  @ApiProperty({
    example: "Game time 40 minutes",
    required: true
  })
  @Column()
  description: string;

  @OneToMany(() => Class, (sportClass) => sportClass.sport)
  classes: Class[];
}
