import { DataTypes } from 'sequelize';
import dbInstance from '../db/dbInstance.js';

const sequelize = dbInstance.getConnection();
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phoneNumber: { // Modified field name
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'phone_number',
    },
    citizenIdNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'citizen_id_number'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false // If you want to include timestamps, set it to true
});

export default User;