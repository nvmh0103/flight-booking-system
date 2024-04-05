import { seats } from "../models/index.js";

class SeatService {
  constructor() {}

  // Method to update the status of a seat
  async updateSeatStatus(seatId, newStatus, trasaction) {
    await sequelize.transaction(async (transaction) => {
      try {
        const seat = await seats.findOne({ where: { id: seatId } });
        if (seat) {
          await seat.update({ status: newStatus }, { transaction });
          return seat;
        } else {
          throw new Error("Seat not found");
        }
      } catch (error) {
        throw new Error("Failed to update seat status");
      }
    });
  }
}

export default SeatService;
