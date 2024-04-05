import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();

const Airport = sequelize.define(
  "Airport",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "airports",
    timestamps: false, // If you want to include timestamps, set it to true
  },
);

export default Airport;
