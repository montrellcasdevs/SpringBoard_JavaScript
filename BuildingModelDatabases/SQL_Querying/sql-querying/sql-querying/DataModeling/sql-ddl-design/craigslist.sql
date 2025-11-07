-- Craigslist schema

DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;
\c craigslist

-- Regions (San Francisco, Atlanta, etc)
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
+);
+
+CREATE TABLE users (
+  id SERIAL PRIMARY KEY,
+  username TEXT NOT NULL UNIQUE,
+  email TEXT,
+  preferred_region_id INTEGER REFERENCES regions(id)
+);
+
+CREATE TABLE locations (
+  id SERIAL PRIMARY KEY,
+  city TEXT,
+  state TEXT,
+  region_id INTEGER REFERENCES regions(id)
+);
+
+CREATE TABLE categories (
+  id SERIAL PRIMARY KEY,
+  name TEXT NOT NULL UNIQUE
+);
+
+CREATE TABLE posts (
+  id SERIAL PRIMARY KEY,
+  title TEXT NOT NULL,
+  body TEXT NOT NULL,
+  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
+  location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
+  region_id INTEGER REFERENCES regions(id) ON DELETE SET NULL,
+  created_at TIMESTAMP DEFAULT now()
+);
+
+-- many-to-many: post belongs to multiple categories
+CREATE TABLE post_categories (
+  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
+  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
+  PRIMARY KEY (post_id, category_id)
+);
+
+-- seed regions
+INSERT INTO regions (name) VALUES ('San Francisco'), ('Atlanta'), ('Seattle') ON CONFLICT DO NOTHING;
+
+-- seed categories
+INSERT INTO categories (name) VALUES ('For Sale'), ('Housing'), ('Jobs'), ('Services'), ('Community') ON CONFLICT DO NOTHING;
+
+-- seed users and locations
+INSERT INTO users (username, email, preferred_region_id) VALUES
+  ('alice', 'alice@example.com', (SELECT id FROM regions WHERE name='San Francisco')),
+  ('bob', 'bob@example.com', (SELECT id FROM regions WHERE name='Atlanta'))
+ON CONFLICT DO NOTHING;
+
+INSERT INTO locations (city, state, region_id) VALUES
+  ('San Francisco', 'CA', (SELECT id FROM regions WHERE name='San Francisco')),
+  ('Atlanta', 'GA', (SELECT id FROM regions WHERE name='Atlanta'))
+ON CONFLICT DO NOTHING;
+
+-- seed posts
+INSERT INTO posts (title, body, user_id, location_id, region_id) VALUES
+  ('Used Bike for Sale', 'Good condition, 3-speed', (SELECT id FROM users WHERE username='alice'), (SELECT id FROM locations WHERE city='San Francisco'), (SELECT id FROM regions WHERE name='San Francisco')),
+  ('Looking for Roommate', '2BR apartment near downtown', (SELECT id FROM users WHERE username='bob'), (SELECT id FROM locations WHERE city='Atlanta'), (SELECT id FROM regions WHERE name='Atlanta'))
+ON CONFLICT DO NOTHING;
+
+-- assign categories to posts
+INSERT INTO post_categories (post_id, category_id) VALUES
+  ((SELECT id FROM posts WHERE title='Used Bike for Sale'), (SELECT id FROM categories WHERE name='For Sale')),
+  ((SELECT id FROM posts WHERE title='Looking for Roommate'), (SELECT id FROM categories WHERE name='Housing'))
+ON CONFLICT DO NOTHING;
