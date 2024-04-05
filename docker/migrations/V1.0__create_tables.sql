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

CREATE TABLE airports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE routes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    departure_airport_id UUID NOT NULL,
    arrival_airport_id UUID NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    estimated_time_of_arrival timestamp NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departure_airport_id) REFERENCES airports (id),
    FOREIGN KEY (arrival_airport_id) REFERENCES airports (id)
);

CREATE TABLE paths (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    departure_airport_id UUID NOT NULL,
    arrival_airport_id UUID NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departure_airport_id) REFERENCES airports (id),
    FOREIGN KEY (arrival_airport_id) REFERENCES airports (id)
);

CREATE TABLE connecting_flights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    path_id UUID NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (path_id) REFERENCES paths (id)
);

CREATE TABLE flights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    connecting_flight_id UUID NOT NULL,
    connecting_index INTEGER NOT NULL,
    route_id UUID NOT NULL,
    gate_number VARCHAR(10) NOT NULL,
    baggage_allowance INTEGER NOT NULL,
    departure_time timestamp NOT NULL,
    airplane_number VARCHAR(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (connecting_flight_id) REFERENCES connecting_flights (id),
    FOREIGN KEY (route_id) REFERENCES routes (id)
);

CREATE TABLE seats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    flight_id UUID NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES flights (id)
);

CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    status VARCHAR(10) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    flight_id UUID NOT NULL,
    seat_id UUID NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    ticket_type VARCHAR(20) NOT NULL,
    booking_id UUID NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (flight_id) REFERENCES flights (id),
    FOREIGN KEY (seat_id) REFERENCES seats (id),
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
);
