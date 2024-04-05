import { DataTypes } from "sequelize";
import dbInstance from "../db/dbInstance.js";

const sequelize = dbInstance.getConnection();
const Booking = sequelize.define(
  "Booking",
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
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_price",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bookings",
    timestamps: true, // If you want to include timestamps, set it to true
  },
);

export default Booking;
