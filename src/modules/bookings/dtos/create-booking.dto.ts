import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  proId: string;

  @IsString()
  serviceCategoryId: string;

  @IsString()
  cityId: string;

  @IsDateString()
  scheduledDate: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
