import { DataTypes } from 'sequelize';
import dbInstance from '../db/dbInstance.js';

const sequelize = dbInstance.getConnection();
const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'bookings',
    timestamps: true // If you want to include timestamps, set it to true
});

export default Booking;