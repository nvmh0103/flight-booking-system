import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Flight = sequelize.define(
  "Flight",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    connectingFlightId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "connecting_flight_id",
    },
    connectingIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "connecting_index",
    },
    routeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "route_id",
    },
    gateNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: "gate_number",
    },
    baggageAllowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "baggage_allowance",
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "departure_time",
    },
    airplaneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "airplane_number",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "flights",
    timestamps: false, // If you want to include timestamps, set it to true
  },
);

export default Flight;
