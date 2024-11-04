import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export class EnrollDto {
  @ApiProperty({
  example: 3,
  required: true
  })
  @IsEmail()
  userId: number;

  @ApiProperty({
  example: 5,
  required: true
  })
  classId: number;
}