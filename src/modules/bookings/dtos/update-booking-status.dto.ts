import { IsIn } from 'class-validator';
import {
  BookingStatus,
  BOOKING_STATUS_VALUES,
} from '../enums/booking-status.enum';

export class UpdateBookingStatusDto {
  @IsIn(BOOKING_STATUS_VALUES)
  status: BookingStatus;
}
