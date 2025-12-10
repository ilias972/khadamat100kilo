import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('bookings/:bookingId/review')
  async createReview(
    @Param('bookingId') bookingId: string,
    @Request() req,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(bookingId, req.user.sub, dto);
  }

  @Get('pros/:proId/reviews')
  async getProReviews(
    @Param('proId') proId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.reviewsService.getProReviews(
      proId,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('pro/:proId/stats')
  async getProRatingStats(@Param('proId') proId: string) {
    return this.reviewsService.getProRatingStats(proId);
  }

  @Get(':reviewId')
  async getReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.getReviewById(reviewId);
  }

  @Get('booking/:bookingId/review')
  async getBookingReview(@Param('bookingId') bookingId: string) {
    return this.reviewsService.getBookingReview(bookingId);
  }
}
