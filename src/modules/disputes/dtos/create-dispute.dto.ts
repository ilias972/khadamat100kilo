import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDisputeDto {
  @IsUUID()
  bookingId: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  description?: string;
}
