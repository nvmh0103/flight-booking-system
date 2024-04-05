import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Seat = sequelize.define(
  "Seat",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    flightId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "flight_id",
    },
    seatNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: "seat_number",
    },
    seatType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "seat_type",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "seats",
    timestamps: false, // If you want to include timestamps, set it to true
  },
);

export default Seat;
