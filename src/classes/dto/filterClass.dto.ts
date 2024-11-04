import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export class FilterClassDto {
  @ApiProperty({
  example: 'Basketball, Football',
  required: true
  })
  sports: string;
}