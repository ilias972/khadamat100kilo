import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsIn,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', minLength: 8, example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'User role', enum: ['CLIENT', 'PRO'], example: 'CLIENT' })
  @IsIn(['CLIENT', 'PRO'])
  role: 'CLIENT' | 'PRO';

  @ApiProperty({ description: 'First name', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Phone number', example: '+212600000000' })
  @IsPhoneNumber('MA') // Morocco
  phone: string;
}