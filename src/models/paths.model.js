import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Path = sequelize.define(
  "Path",
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "paths",
    timestamps: true, // If you want to include timestamps, set it to true
  },
);

export default Path;
