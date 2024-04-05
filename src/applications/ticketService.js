import { Ticket } from "../models/index.js";
class ticketService {
  async createTicket(flightId, userId, seatId, bookingId, transaction) {
    // Add your code here to create a ticket
    return Ticket.create(
      { flightId, userId, seatId, bookingId },
      { transaction },
    );
  }
}

export default ticketService;
