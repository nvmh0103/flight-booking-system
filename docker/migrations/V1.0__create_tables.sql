CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    citizen_id_number VARCHAR(20) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE route (
    id SERIAL PRIMARY KEY,
    departure_airport_id INT NOT NULL,
    arrival_airport_id INT NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    estimated_time_of_arrival timestamp NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (departure_airport_id) REFERENCES airports(id),
    FOREIGN KEY (arrival_airport_id) REFERENCES airports(id)
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    departure_airport_id INT NOT NULL,
    arrival_airport_id INT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (departure_airport_id) REFERENCES airports(id),
    FOREIGN KEY (arrival_airport_id) REFERENCES airports(id)
);

CREATE TABLE flight_details (
    id SERIAL PRIMARY KEY,
    flight_id INT NOT NULL,
    route_id INT NOT NULL,
    gate_number VARCHAR(10) NOT NULL,
    baggage_allowance INT NOT NULL,
    departure_time timestamp NOT NULL,
    airplane_number VARCHAR(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (flight_id) REFERENCES flights(id),
    FOREIGN KEY (route_id) REFERENCES route(id)
);


CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    flight_details_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,

    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_details_id) REFERENCES flight_details(id)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    flight_details_id INT NOT NULL,
    seat_id INT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    ticket_type VARCHAR(20) NOT NULL,
    bookings_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_details_id) REFERENCES flight_details(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    FOREIGN KEY (bookings_id) REFERENCES bookings(id)

);
