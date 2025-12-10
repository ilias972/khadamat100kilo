import { IsIn, IsOptional, IsString } from 'class-validator';

export class ResolveDisputeDto {
  @IsIn(['resolved', 'closed'])
  status: string;

  @IsOptional()
  @IsString()
  resolution?: string;
}
