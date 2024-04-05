import { ConnectingFlight, Flight } from "../models/index.js";
import { Op } from "sequelize";

class FlightService {
  constructor() {}

  // Add any additional methods or properties here
  async getFlights(conditions) {
    // Implement the method here
    const { departureAirport, arrivalAirport, date, numberOfSeat } = conditions;
    // querying
    const flights = await Flight.findAll({
      where: {
        departure_time: {
          [Op.gt]: new Date(date),
        },
      },
      include: {
        model: ConnectingFlight,
        where: {
          departureAirport,
          arrivalAirport,
        },
      },
    });

    return flights;
  }
}

export default new FlightService();
