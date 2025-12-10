import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string; // Only for PRO users

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsObject()
  clientProfile?: {
    address?: string;
    cityId?: string;
    preferredLanguage?: string;
  };

  @IsOptional()
  @IsObject()
  proProfile?: {
    profession?: string;
    bio?: string;
    cityId?: string;
  };
}