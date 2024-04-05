import { DataTypes } from 'sequelize';
import dbInstance from '../db/dbInstance.js';

const sequelize = dbInstance.getConnection();
const Airport = sequelize.define('Airport', {
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'airports',
    timestamps: true // If you want to include timestamps, set it to true
});

export default Airport;

