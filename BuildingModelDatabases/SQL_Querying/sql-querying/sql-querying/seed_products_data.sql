-- seed_products_data.sql
-- Data-only seed for the products table
-- Assumes the database and table are created by `seed_products.sql` (Postgres)

\c products_db

-- remove existing rows (keeps the table definition)
TRUNCATE TABLE products RESTART IDENTITY;

-- Insert a few representative rows that satisfy constraints:
-- columns: id (serial), name (text not null), price (float > 0), can_be_returned (boolean not null)
INSERT INTO products (name, price, can_be_returned) VALUES
  ('Wireless Mouse', 25.99, TRUE),
  ('USB-C Cable 1m', 9.99, TRUE),
  ('Laptop Stand', 39.50, FALSE),
  ('Noise-Cancelling Headphones', 129.95, TRUE),
  ('Webcam 1080p', 59.00, TRUE),
  ('Mechanical Keyboard', 89.00, TRUE),
  ('External SSD 1TB', 159.99, FALSE);

-- Quick sanity-check select (optional when running interactively)
SELECT id, name, price, can_be_returned FROM products ORDER BY id LIMIT 10;
