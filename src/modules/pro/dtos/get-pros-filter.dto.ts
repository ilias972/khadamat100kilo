import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class GetProsFilterDto {
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  minRating?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  maxPrice?: number;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
