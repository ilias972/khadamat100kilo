import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsIn,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User phone number', example: '+212600000000' })
  @IsPhoneNumber('MA') // Morocco
  phone: string;

  @ApiProperty({ description: 'User password', minLength: 8, example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'User role', enum: ['CLIENT', 'PRO'], example: 'CLIENT' })
  @IsIn(['CLIENT', 'PRO'])
  role: 'CLIENT' | 'PRO';

  // Client fields
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsString()
  lastName: string;

  // Pro fields
  @ApiProperty({ description: 'Profession (for pro users)', required: false, example: 'Electrician' })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty({ description: 'Bio (for pro users)', required: false, example: 'Experienced electrician with 10 years experience' })
  @IsOptional()
  @IsString()
  bio?: string;
}
