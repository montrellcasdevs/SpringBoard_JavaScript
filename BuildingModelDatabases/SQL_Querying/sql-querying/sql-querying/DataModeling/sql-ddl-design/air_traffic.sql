-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

-- Normalized schema for air traffic: airlines, airports, flights, passengers, tickets

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE airports (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  UNIQUE (city, country)
);

CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  airline_id INTEGER NOT NULL REFERENCES airlines(id) ON DELETE CASCADE,
  from_airport_id INTEGER NOT NULL REFERENCES airports(id) ON DELETE CASCADE,
  to_airport_id INTEGER NOT NULL REFERENCES airports(id) ON DELETE CASCADE,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL
);

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  UNIQUE (first_name, last_name)
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER NOT NULL REFERENCES passengers(id) ON DELETE CASCADE,
  flight_id INTEGER NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  seat TEXT NOT NULL,
  UNIQUE (passenger_id, flight_id, seat)
);

-- seed data: airlines
INSERT INTO airlines (name) VALUES
  ('United'),
  ('British Airways'),
  ('Delta'),
  ('TUI Fly Belgium'),
  ('Air China'),
  ('American Airlines'),
  ('Avianca Brasil')
ON CONFLICT DO NOTHING;

-- seed data: airports (unique by city + country)
INSERT INTO airports (city, country) VALUES
  ('Washington DC', 'United States'),
  ('Seattle', 'United States'),
  ('Tokyo', 'Japan'),
  ('London', 'United Kingdom'),
  ('Los Angeles', 'United States'),
  ('Las Vegas', 'United States'),
  ('Mexico City', 'Mexico'),
  ('Paris', 'France'),
  ('Casablanca', 'Morocco'),
  ('Dubai', 'UAE'),
  ('Beijing', 'China'),
  ('New York', 'United States'),
  ('Charlotte', 'United States'),
  ('Cedar Rapids', 'United States'),
  ('Chicago', 'United States'),
  ('New Orleans', 'United States'),
  ('Sao Paolo', 'Brazil'),
  ('Santiago', 'Chile')
ON CONFLICT DO NOTHING;

-- seed data: passengers (unique by name)
INSERT INTO passengers (first_name, last_name) VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes')
ON CONFLICT DO NOTHING;

-- seed data: flights (map from original flat rows)
INSERT INTO flights (airline_id, from_airport_id, to_airport_id, departure, arrival)
VALUES
  ((SELECT id FROM airlines WHERE name='United'), (SELECT id FROM airports WHERE city='Washington DC' AND country='United States'), (SELECT id FROM airports WHERE city='Seattle' AND country='United States'), '2018-04-08 09:00:00', '2018-04-08 12:00:00'),
  ((SELECT id FROM airlines WHERE name='British Airways'), (SELECT id FROM airports WHERE city='Tokyo' AND country='Japan'), (SELECT id FROM airports WHERE city='London' AND country='United Kingdom'), '2018-12-19 12:45:00', '2018-12-19 16:15:00'),
  ((SELECT id FROM airlines WHERE name='Delta'), (SELECT id FROM airports WHERE city='Los Angeles' AND country='United States'), (SELECT id FROM airports WHERE city='Las Vegas' AND country='United States'), '2018-01-02 07:00:00', '2018-01-02 08:03:00'),
  ((SELECT id FROM airlines WHERE name='Delta'), (SELECT id FROM airports WHERE city='Seattle' AND country='United States'), (SELECT id FROM airports WHERE city='Mexico City' AND country='Mexico'), '2018-04-15 16:50:00', '2018-04-15 21:00:00'),
  ((SELECT id FROM airlines WHERE name='TUI Fly Belgium'), (SELECT id FROM airports WHERE city='Paris' AND country='France'), (SELECT id FROM airports WHERE city='Casablanca' AND country='Morocco'), '2018-08-01 18:30:00', '2018-08-01 21:50:00'),
  ((SELECT id FROM airlines WHERE name='Air China'), (SELECT id FROM airports WHERE city='Dubai' AND country='UAE'), (SELECT id FROM airports WHERE city='Beijing' AND country='China'), '2018-10-31 01:15:00', '2018-10-31 12:55:00'),
  ((SELECT id FROM airlines WHERE name='United'), (SELECT id FROM airports WHERE city='New York' AND country='United States'), (SELECT id FROM airports WHERE city='Charlotte' AND country='United States'), '2019-02-06 06:00:00', '2019-02-06 07:47:00'),
  ((SELECT id FROM airlines WHERE name='American Airlines'), (SELECT id FROM airports WHERE city='Cedar Rapids' AND country='United States'), (SELECT id FROM airports WHERE city='Chicago' AND country='United States'), '2018-12-22 14:42:00', '2018-12-22 15:56:00'),
  ((SELECT id FROM airlines WHERE name='American Airlines'), (SELECT id FROM airports WHERE city='Charlotte' AND country='United States'), (SELECT id FROM airports WHERE city='New Orleans' AND country='United States'), '2019-02-06 16:28:00', '2019-02-06 19:18:00'),
  ((SELECT id FROM airlines WHERE name='Avianca Brasil'), (SELECT id FROM airports WHERE city='Sao Paolo' AND country='Brazil'), (SELECT id FROM airports WHERE city='Santiago' AND country='Chile'), '2019-01-20 19:30:00', '2019-01-20 22:45:00')
ON CONFLICT DO NOTHING;

-- seed data: tickets (link passenger -> flight with seat)
-- We match passenger names to flight rows in insertion order above
INSERT INTO tickets (passenger_id, flight_id, seat)
VALUES
  ((SELECT id FROM passengers WHERE first_name='Jennifer' AND last_name='Finch'), (SELECT id FROM flights WHERE departure='2018-04-08 09:00:00' AND arrival='2018-04-08 12:00:00'), '33B'),
  ((SELECT id FROM passengers WHERE first_name='Thadeus' AND last_name='Gathercoal'), (SELECT id FROM flights WHERE departure='2018-12-19 12:45:00'), '8A'),
  ((SELECT id FROM passengers WHERE first_name='Sonja' AND last_name='Pauley'), (SELECT id FROM flights WHERE departure='2018-01-02 07:00:00'), '12F'),
  ((SELECT id FROM passengers WHERE first_name='Jennifer' AND last_name='Finch'), (SELECT id FROM flights WHERE departure='2018-04-15 16:50:00'), '20A'),
  ((SELECT id FROM passengers WHERE first_name='Waneta' AND last_name='Skeleton'), (SELECT id FROM flights WHERE departure='2018-08-01 18:30:00'), '23D'),
  ((SELECT id FROM passengers WHERE first_name='Thadeus' AND last_name='Gathercoal'), (SELECT id FROM flights WHERE departure='2018-10-31 01:15:00'), '18C'),
  ((SELECT id FROM passengers WHERE first_name='Berkie' AND last_name='Wycliff'), (SELECT id FROM flights WHERE departure='2019-02-06 06:00:00'), '9E'),
  ((SELECT id FROM passengers WHERE first_name='Alvin' AND last_name='Leathes'), (SELECT id FROM flights WHERE departure='2018-12-22 14:42:00'), '1A'),
  ((SELECT id FROM passengers WHERE first_name='Berkie' AND last_name='Wycliff'), (SELECT id FROM flights WHERE departure='2019-02-06 16:28:00'), '32B'),
  ((SELECT id FROM passengers WHERE first_name='Cory' AND last_name='Squibbes'), (SELECT id FROM flights WHERE departure='2019-01-20 19:30:00'), '10D')
ON CONFLICT DO NOTHING;