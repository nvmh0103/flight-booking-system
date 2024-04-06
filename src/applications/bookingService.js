import { Booking } from "../models/index.js";
import TicketService from "./ticketService.js";
import logger from "../logger/winston.js";
import sequelize from "../db/dbInstance.js";

class BookingService {
  async createBooking(tickets, userId) {
    // Add your code here to create a ticket
    const t = await sequelize.getConnection().transaction();
    try {
      // Start transaction

      const totalPrice = tickets.reduce((acc, ticket) => acc + ticket.price, 0);
      console.log(userId, totalPrice);
      const booking = await Booking.create(
        {
          userId,
          status: "CONFIRMED",
          paymentId: "123456",
          totalPrice: "10",
        },
        { transaction: t },
      );
      await Promise.all(
        tickets.map(async (ticket) => {
          console.log(ticket);
          // Create ticket
          await TicketService.createTicket(
            ticket.flightId,
            userId,
            ticket.seatId,
            booking.id,
            t,
          );
        }),
      );
      await t.commit();
      return booking;
    } catch (error) {
      logger.error(`Failed to create ticket for user ${userId}: ${error}`);
      await t.rollback();
    }
  }
}

export default new BookingService();
