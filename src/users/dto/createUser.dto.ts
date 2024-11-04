import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { Enrollment } from 'src/enrollments/enrollment.entity';

export class CreateUserDto {
  id: number;

  @ApiProperty({
    example: 'ivan kovac',
    required: true
  })
  name: string;

  @ApiProperty({
  example: 'rehmat.sayani@gmail.com',
  required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
  example: '1234578910',
  required: true
  })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    example: "admin|user",
    default: 'user'
  })
  roles: string;

  @ApiProperty({
    example: "list of enrollments",
    default: []
  })
  enrollments: Enrollment[];
}