CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    citizen_id_number VARCHAR(20) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

// FILEPATH: /C:/Users/hoang/OneDrive/Documents/GitHub/flight-booking-system/docker/migrations/V1.0__create_tables.sql

const { DataTypes } = require('sequelize');
const sequelize = require('your-sequelize-instance'); // Replace with your Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    citizen_id_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

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
});

const Route = sequelize.define('Route', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    departure_airport_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    arrival_airport_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estimated_time_of_arrival: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const Path = sequelize.define('Path', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    departure_airport_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    arrival_airport_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const ConnectingFlight = sequelize.define('ConnectingFlight', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    path_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const Flight = sequelize.define('Flight', {
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
});

const Seat = sequelize.define('Seat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    flight_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    seat_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

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
});

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    flight_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    seat_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    ticket_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    booking_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

// Define associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Airport.hasMany(Route, { foreignKey: 'departure_airport_id' });
Airport.hasMany(Route, { foreignKey: 'arrival_airport_id' });
Route.belongsTo(Airport, { foreignKey: 'departure_airport_id' });
Route.belongsTo(Airport, { foreignKey: 'arrival_airport_id' });

Airport.hasMany(Path, { foreignKey: 'departure_airport_id' });
Airport.hasMany(Path, { foreignKey: 'arrival_airport_id' });
Path.belongsTo(Airport, { foreignKey: 'departure_airport_id' });
Path.belongsTo(Airport, { foreignKey: 'arrival_airport_id' });

Path.hasMany(ConnectingFlight, { foreignKey: 'path_id' });
ConnectingFlight.belongsTo(Path, { foreignKey: 'path_id' });

ConnectingFlight.hasMany(Flight, { foreignKey: 'connecting_flight_id' });
Flight.belongsTo(ConnectingFlight, { foreignKey: 'connecting_flight_id' });

Route.hasMany(Flight, { foreignKey: 'route_id' });
Flight.belongsTo(Route, { foreignKey: 'route_id' });

Flight.hasMany(Seat, { foreignKey: 'flight_id' });
Seat.belongsTo(Flight, { foreignKey: 'flight_id' });

Booking.hasMany(Ticket, { foreignKey: 'booking_id' });
Ticket.belongsTo(Booking, { foreignKey: 'booking_id' });

Flight.hasMany(Ticket, { foreignKey: 'flight_id' });
Ticket.belongsTo(Flight, { foreignKey: 'flight_id' });

Seat.hasMany(Ticket, { foreignKey: 'seat_id' });
Ticket.belongsTo(Seat, { foreignKey: 'seat_id' });

module.exports = {
    User,
    Airport,
    Route,
    Path,
    ConnectingFlight,
    Flight,
    Seat,
    Booking,
    Ticket,
};
