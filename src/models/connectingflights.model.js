import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const ConnectingFlight = sequelize.define(
  "ConnectingFlight",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pathId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "path_id",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "connecting_flights",
    timestamps: true, // If you want to include timestamps, set it to true
  },
);

export default ConnectingFlight;
