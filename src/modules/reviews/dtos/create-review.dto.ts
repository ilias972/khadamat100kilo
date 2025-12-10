import {
  IsInt,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photosBeforeAfter?: string[];

  @IsOptional()
  @IsBoolean()
  isVerifiedClient?: boolean = false;
}
