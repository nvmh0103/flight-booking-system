import { ConnectingFlight, Flight, Airport, Path } from "../models/index.js";
import { Op } from "sequelize";

class FlightService {
  constructor() {}

  // Add any additional methods or properties here
  async getFlights(conditions) {
    // Implement the method here
    const { departureAirport, arrivalAirport, date, numberOfSeat } = conditions;
    // querying
    const flights = await Flight.findAll({
      // where: {
      //   departureTime: {
      //     [Op.gt]: date,
      //   },
      // },
      include: [
        {
          model: ConnectingFlight,
          required: true,
          include: [
            {
              model: Path,
              required: true,
              include: [
                {
                  model: Airport,
                  as: "DepartureAirport",
                  where: {
                    name: departureAirport,
                  },
                },
                {
                  model: Airport,
                  as: "ArrivalAirport",
                  where: {
                    name: arrivalAirport,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    return flights;
  }
}

export default new FlightService();
