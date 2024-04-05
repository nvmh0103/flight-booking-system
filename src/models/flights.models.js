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
    connecting_flight_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    connecting_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    route_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    gate_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    baggage_allowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departure_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    airplane_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "flights",
    timestamps: true, // If you want to include timestamps, set it to true
  },
);

export default Flight;
