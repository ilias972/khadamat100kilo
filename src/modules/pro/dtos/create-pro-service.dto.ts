import { IsString, IsNumber } from 'class-validator';

export class CreateProServiceDto {
  @IsString()
  categoryId: string;

  @IsString()
  cityId: string;

  @IsNumber()
  basePrice: number;

  @IsString()
  description: string;
}
