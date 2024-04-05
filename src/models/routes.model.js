import { DataTypes } from 'sequelize';
import dbInstance from '../db/dbInstance.js';

const sequelize = dbInstance.getConnection();
const Route = sequelize.define('Route', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    departureAirportId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    arrivalAirportId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estimatedTimeOfArrival: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'routes',
    timestamps: true // If you don't want Sequelize to manage createdAt and updatedAt fields
});

export default Route;