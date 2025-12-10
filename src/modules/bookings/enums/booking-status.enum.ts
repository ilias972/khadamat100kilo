export enum BookingStatus {
  QUOTED = 'quoted',
  ACCEPTED = 'accepted',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled',
}

export const BOOKING_STATUS_VALUES = Object.values(BookingStatus);
