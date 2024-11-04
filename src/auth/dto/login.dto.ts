import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export class LoginDto {
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
}