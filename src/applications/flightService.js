import {
  ConnectingFlight,
  Flight,
  Airport,
  Path,
  Route,
} from "../models/index.js";
import { Op } from "sequelize";

class FlightService {
  constructor() {}

  // Add any additional methods or properties here
  async getFlights(conditions) {
    // Implement the method here
    const { departureAirport, arrivalAirport, date, numberOfSeat } = conditions;
    // querying
    const flights = await Flight.findAll({
      attributes: [
        "departureTime",
        "airplaneNumber",
        "gateNumber",
        "connectingIndex",
      ],
      // where: {
      //   departureTime: {
      //     [Op.gt]: date,
      //   },
      // },
      include: [
        {
          model: ConnectingFlight,
          attributes: ["id"],
          required: true,
          include: [
            {
              model: Path,
              attributes: ["id"],
              required: true,
              include: [
                {
                  model: Airport,
                  attributes: ["name", "city", "country"],
                  as: "Departure",
                  where: {
                    name: departureAirport,
                  },
                },
                {
                  model: Airport,
                  attributes: ["name", "city", "country"],
                  as: "Destination",
                  where: {
                    name: arrivalAirport,
                  },
                },
              ],
            },
          ],
        },
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
    });

    return flights;
  }
}

export default new FlightService();
