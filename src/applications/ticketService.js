import logger from "../logger/winston.js";
import { Ticket, Airport, Flight, Route, Seat } from "../models/index.js";
import seatService from "./seatService.js";
import sequelize from "../db/dbInstance.js";

class TicketService {
  async createTicket(flightId, userId, seatId, bookingId, transaction) {
    // Add your code here to create a ticket
    // Update seat status
    logger.info(flightId, userId, seatId, bookingId);
    logger.info(`Creating ticket for user ${userId}`);
    const seat = await seatService.updateSeatStatus(
      seatId,
      "AVAILABLE",
      "BOOKED",
      flightId,
      transaction,
    );

    if (!seat) {
      throw new Error("Seat not found");
    }

    return await Ticket.create(
      { flightId, userId, seatId, bookingId },
      { transaction },
    );
  }

  async getTicketsByUserId(userId) {
    // Add your code here to get tickets by userId
    return await Ticket.findAll({
      attributes: ["id"],
      where: { userId },
      include: [
        {
          model: Flight,
          attributes: ["id", "gateNumber", "baggageAllowance", "departureTime"],
          required: true,
          include: [
            {
              model: Route,
              attributes: ["id", "distance", "estimatedTimeOfArrival"],
              required: true,
              include: [
                {
                  model: Airport,
                  attributes: ["name", "city", "country"],
                  as: "DepartureAirport",
                },
                {
                  model: Airport,
                  attributes: ["name", "city", "country"],
                  as: "ArrivalAirport",
                },
              ],
            },
          ],
        },
        {
          model: Seat,
          attributes: ["id", "seatNumber", "status"],
        },
      ],
    });
  }

  async deleteTicket(ticketId, userId) {
    // Add your code here to delete a ticket
    const ticket = await Ticket.findOne({
      where: { id: ticketId, userId },
      include: [
        {
          model: Seat,
          attributes: ["id", "status"],
        },
      ],
    });
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const transaction = await sequelize.getConnection().transaction();
    try {
      await seatService.updateSeatStatus(
        ticket.Seat.id,
        "BOOKED",
        "AVAILABLE",
        ticket.flightId,
        transaction,
      );
      await ticket.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error("Failed to delete ticket");
    }
  }
}

export default new TicketService();
