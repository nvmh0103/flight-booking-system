import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    flightId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "flight_id",
    },
    seatId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "seat_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    ticketType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "ticket_type",
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "booking_id",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "tickets",
    timestamps: false,
  },
);

export default Ticket;
