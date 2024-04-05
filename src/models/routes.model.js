import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Route = sequelize.define(
  "Route",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    departureAirportId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "departure_airport_id",
    },
    arrivalAirportId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "arrival_airport_id",
    },
    distance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estimatedTimeOfArrival: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "estimated_time_of_arrival",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "routes",
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields
  },
);

export default Route;
