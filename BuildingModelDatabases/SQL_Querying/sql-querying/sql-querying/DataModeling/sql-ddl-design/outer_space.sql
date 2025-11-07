-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

-- Normalized schema for outer space: galaxies -> stars -> planets -> moons

CREATE TABLE galaxies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE stars (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  galaxy_id INTEGER NOT NULL REFERENCES galaxies(id) ON DELETE CASCADE,
  UNIQUE (name, galaxy_id)
);

CREATE TABLE planets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  star_id INTEGER NOT NULL REFERENCES stars(id) ON DELETE CASCADE,
  orbital_period_in_years FLOAT NOT NULL,
  UNIQUE (name, star_id)
);

CREATE TABLE moons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INTEGER NOT NULL REFERENCES planets(id) ON DELETE CASCADE,
  UNIQUE (name, planet_id)
);

-- seed data (transformed from original flat schema)
INSERT INTO galaxies (name) VALUES ('Milky Way') ON CONFLICT DO NOTHING;

-- insert stars
INSERT INTO stars (name, galaxy_id)
VALUES
  ('The Sun', (SELECT id FROM galaxies WHERE name='Milky Way')),
  ('Proxima Centauri', (SELECT id FROM galaxies WHERE name='Milky Way')),
  ('Gliese 876', (SELECT id FROM galaxies WHERE name='Milky Way'))
ON CONFLICT DO NOTHING;

-- insert planets
INSERT INTO planets (name, star_id, orbital_period_in_years)
VALUES
  ('Earth', (SELECT id FROM stars WHERE name='The Sun' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 1.00),
  ('Mars', (SELECT id FROM stars WHERE name='The Sun' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 1.88),
  ('Venus', (SELECT id FROM stars WHERE name='The Sun' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 0.62),
  ('Neptune', (SELECT id FROM stars WHERE name='The Sun' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 164.8),
  ('Proxima Centauri b', (SELECT id FROM stars WHERE name='Proxima Centauri' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 0.03),
  ('Gliese 876 b', (SELECT id FROM stars WHERE name='Gliese 876' AND galaxy_id = (SELECT id FROM galaxies WHERE name='Milky Way')), 0.23)
ON CONFLICT DO NOTHING;

-- insert moons for planets that have them
INSERT INTO moons (name, planet_id)
VALUES
  ('The Moon', (SELECT id FROM planets WHERE name='Earth')),
  ('Phobos', (SELECT id FROM planets WHERE name='Mars')),
  ('Deimos', (SELECT id FROM planets WHERE name='Mars')),
  ('Naiad', (SELECT id FROM planets WHERE name='Neptune')),
  ('Thalassa', (SELECT id FROM planets WHERE name='Neptune')),
  ('Despina', (SELECT id FROM planets WHERE name='Neptune')),
  ('Galatea', (SELECT id FROM planets WHERE name='Neptune')),
  ('Larissa', (SELECT id FROM planets WHERE name='Neptune')),
  ('S/2004 N 1', (SELECT id FROM planets WHERE name='Neptune')),
  ('Proteus', (SELECT id FROM planets WHERE name='Neptune')),
  ('Triton', (SELECT id FROM planets WHERE name='Neptune')),
  ('Nereid', (SELECT id FROM planets WHERE name='Neptune')),
  ('Halimede', (SELECT id FROM planets WHERE name='Neptune')),
  ('Sao', (SELECT id FROM planets WHERE name='Neptune')),
  ('Laomedeia', (SELECT id FROM planets WHERE name='Neptune')),
  ('Psamathe', (SELECT id FROM planets WHERE name='Neptune')),
  ('Neso', (SELECT id FROM planets WHERE name='Neptune'))
ON CONFLICT DO NOTHING;