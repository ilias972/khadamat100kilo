import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email or phone number', example: 'user@example.com' })
  @IsString()
  emailOrPhone: string;

  @ApiProperty({ description: 'User password', minLength: 8, example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;
}
