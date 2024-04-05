import User from "./users.model.js";
import Booking from "./bookings.model.js";
import Airport from "./airports.model.js";
import Route from "./routes.model.js";
import Path from "./paths.model.js";
import Flight from "./flights.models.js";
import Seat from "./seats.model.js";
import Ticket from "./tickets.model.js";
import ConnectingFlight from "./connectingflights.model.js";

User.hasMany(Booking, { foreignKey: "user_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

Airport.hasMany(Route, { foreignKey: "departure_airport_id" });
Airport.hasMany(Route, { foreignKey: "arrival_airport_id" });
Route.belongsTo(Airport, { foreignKey: "departure_airport_id" });
Route.belongsTo(Airport, { foreignKey: "arrival_airport_id" });

Airport.hasMany(Path, { foreignKey: "departure_airport_id" });
Airport.hasMany(Path, { foreignKey: "arrival_airport_id" });
Path.belongsTo(Airport, { foreignKey: "departure_airport_id" });
Path.belongsTo(Airport, { foreignKey: "arrival_airport_id" });

Path.hasMany(ConnectingFlight, { foreignKey: "path_id" });
ConnectingFlight.belongsTo(Path, { foreignKey: "path_id" });

ConnectingFlight.hasMany(Flight, { foreignKey: "connecting_flight_id" });
Flight.belongsTo(ConnectingFlight, { foreignKey: "connecting_flight_id" });

Route.hasMany(Flight, { foreignKey: "route_id" });
Flight.belongsTo(Route, { foreignKey: "route_id" });

Flight.hasMany(Seat, { foreignKey: "flight_id" });
Seat.belongsTo(Flight, { foreignKey: "flight_id" });

Booking.hasMany(Ticket, { foreignKey: "booking_id" });
Ticket.belongsTo(Booking, { foreignKey: "booking_id" });

Flight.hasMany(Ticket, { foreignKey: "flight_id" });
Ticket.belongsTo(Flight, { foreignKey: "flight_id" });

Seat.hasMany(Ticket, { foreignKey: "seat_id" });
Ticket.belongsTo(Seat, { foreignKey: "seat_id" });

export {
  User,
  Booking,
  Airport,
  Route,
  Path,
  Flight,
  Seat,
  Ticket,
  ConnectingFlight,
};
