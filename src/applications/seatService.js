import { Seat, Flight } from "../models/index.js";

class SeatService {
  constructor() {}

  // Method to update the status of a seat
  async updateSeatStatus(seatId, newStatus, flightId, transaction) {
    const seat = await Seat.findOne({
      where: { id: seatId },
      include: [
        {
          model: Flight,
          as: "Flight",
          where: {
            id: flightId,
          },
        },
      ],
    });
    if (!seat || seat.status === "BOOKED") {
      throw new Error("Seat not found");
    }

    if (seat) {
      await seat.update({ status: newStatus }, { transaction });
      return seat;
    } else {
      throw new Error("Seat not found");
    }
  }
}

export default new SeatService();
