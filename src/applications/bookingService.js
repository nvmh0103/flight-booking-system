import { Booking } from "../models/index.js";
class BookingService {
  async createTicket(flightId, userId, seatId, bookingId, transaction) {
    // Add your code here to create a ticket
    return Booking.create(
      { flightId, userId, seatId, bookingId },
      { transaction },
    );
  }
}

export default ticketService;
