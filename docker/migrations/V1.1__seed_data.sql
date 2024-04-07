-- Insert seed data for airports table
INSERT INTO airports (name, city, country)
VALUES 
  ('JFK Airport', 'New York', 'United States'),
  ('LAX Airport', 'Los Angeles', 'United States');

-- Insert seed data for routes table
INSERT INTO routes (departure_airport_id, arrival_airport_id, distance, estimated_time_of_arrival)
VALUES 
  ((SELECT id FROM airports WHERE name = 'JFK Airport'), (SELECT id FROM airports WHERE name = 'LAX Airport'), 2500.00, '2022-12-31 23:59:59');

-- Insert seed data for paths table
INSERT INTO paths (departure_airport_id, arrival_airport_id)
VALUES 
  ((SELECT id FROM airports WHERE name = 'JFK Airport'), (SELECT id FROM airports WHERE name = 'LAX Airport'));

-- Insert seed data for connecting_flights table
INSERT INTO connecting_flights (path_id)
VALUES 
  ((SELECT id FROM paths WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport')));

-- Insert seed data for flights table
INSERT INTO flights (connecting_flight_id, connecting_index, route_id, gate_number, baggage_allowance, departure_time, airplane_number)
VALUES 
  ((SELECT id FROM connecting_flights WHERE path_id = (SELECT id FROM paths WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport'))), 1, (SELECT id FROM routes WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport')), 'A1', 2, '2022-12-31 12:00:00', 'ABC123');

-- Insert seed data for seats table
INSERT INTO seats (flight_id, seat_number, seat_type, price, status)
VALUES 
  ((SELECT id FROM flights WHERE connecting_flight_id = (SELECT id FROM connecting_flights WHERE path_id = (SELECT id FROM paths WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport')))), 'A1', 'economy', '100', 'AVAILABLE'),
  ((SELECT id FROM flights WHERE connecting_flight_id = (SELECT id FROM connecting_flights WHERE path_id = (SELECT id FROM paths WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport')))), 'A2', 'business','200','AVAILABLE'),
  ((SELECT id FROM flights WHERE connecting_flight_id = (SELECT id FROM connecting_flights WHERE path_id = (SELECT id FROM paths WHERE departure_airport_id = (SELECT id FROM airports WHERE name = 'JFK Airport') AND arrival_airport_id = (SELECT id FROM airports WHERE name = 'LAX Airport')))), 'A3', 'first class','300','AVAILABLE');
