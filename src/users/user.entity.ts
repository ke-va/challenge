import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    required: true,
    readOnly: true
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ivan kovac',
    required: true
  })
  @Column()
  name: string;

  @ApiProperty({
  example: 'rehmat.sayani@gmail.com',
  required: true
  })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({
  example: '1234578910',
  required: true
  })
  @IsNotEmpty()
  @MinLength(4)
  @Column()
  password: string;

  @ApiProperty({
    example: "admin|user",
    default: 'user'
  })
  @Column({ default: 'user' })
  roles: string;  // 'user' or 'admin'

  @ApiProperty({
    example: "list of enrollments",
    default: []
  })
  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];
}
