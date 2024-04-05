import {
  ConnectingFlight,
  Flight,
  Airport,
  Path,
  Route,
  Seat,
} from "../models/index.js";
import { Op } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
class FlightService {
  constructor() {}

  async getFlights(conditions) {
    // Implement the method here
    const { departureAirport, arrivalAirport, date, numberOfSeat } = conditions;
    const flights = await Flight.findAll({
      attributes: [
        "departureTime",
        "airplaneNumber",
        "gateNumber",
        "connectingIndex",
      ],
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
        {
          model: Seat,
          attributes: ["id", "seatNumber"],
          required: true,
          where: sequelize.where(
            sequelize.literal(
              `( SELECT COUNT(*) FROM "seats" WHERE "seats"."status" = 'available')`,
            ),
            Op.gte,
            numberOfSeat,
          ),
        },
      ],
      where: {
        departureTime: {
          [Op.gte]: date,
        },
      },
    });

    return flights;
  }
}

export default new FlightService();
