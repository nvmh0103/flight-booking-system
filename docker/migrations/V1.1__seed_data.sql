-- Seed data for airports table
INSERT INTO airports (name, city, country) VALUES
  ('John F. Kennedy International Airport', 'New York', 'United States'),
  ('Heathrow Airport', 'London', 'United Kingdom'),
  ('Charles de Gaulle Airport', 'Paris', 'France');

-- Seed data for route table
INSERT INTO route (departure_airport_id, arrival_airport_id, distance, estimated_time_of_arrival) VALUES
  ((SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport'), 
   (SELECT id FROM airports WHERE name = 'Heathrow Airport'), 5000, '2022-12-31 18:00:00'),
  ((SELECT id FROM airports WHERE name = 'Heathrow Airport'), 
   (SELECT id FROM airports WHERE name = 'Charles de Gaulle Airport'), 6000, '2022-12-31 20:00:00');

-- Seed data for flights table
INSERT INTO flights (departure_airport_id, arrival_airport_id) VALUES
  ((SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport'), 
   (SELECT id FROM airports WHERE name = 'Heathrow Airport')),
  ((SELECT id FROM airports WHERE name = 'Heathrow Airport'), 
   (SELECT id FROM airports WHERE name = 'Charles de Gaulle Airport'));

-- Seed data for flight_details table
INSERT INTO flight_details (flight_id, route_id, gate_number, baggage_allowance, departure_time, airplane_number) VALUES
  ((SELECT id FROM flights WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport')),
   (SELECT id FROM route WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport')),
   'A1', 2, '2022-12-31 17:30:00', 'ABC123'),
  ((SELECT id FROM flights WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Charles de Gaulle Airport')),
   (SELECT id FROM route WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Charles de Gaulle Airport')),
   'B2', 1, '2022-12-31 19:30:00', 'DEF456');

-- Seed data for seats table
INSERT INTO seats (flight_details_id, seat_number, status) VALUES
  ((SELECT id FROM flight_details WHERE flight_id = (SELECT id FROM flights WHERE departure_airport_id = 
    (SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport'))),
   'A1', 'Available'),
  ((SELECT id FROM flight_details WHERE flight_id = (SELECT id FROM flights WHERE departure_airport_id = 
    (SELECT id FROM airports WHERE name = 'John F. Kennedy International Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Heathrow Airport'))),
   'A2', 'Available'),
  ((SELECT id FROM flight_details WHERE flight_id = (SELECT id FROM flights WHERE departure_airport_id = 
    (SELECT id FROM airports WHERE name = 'Heathrow Airport') 
    AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'Charles de Gaulle Airport'))),
   'B1', 'Booked');
