-- Comments in SQL Start with dash-dash --

-- crud.sql
-- Commands for the 14 requested CRUD operations against the products table
-- Assumes Postgres and that the `products_db` and `products` table already exist.

\c products_db

-- 1) Add a product: chair
INSERT INTO products (name, price, can_be_returned) VALUES ('chair', 44.00, FALSE);

-- 2) Add a product: stool
INSERT INTO products (name, price, can_be_returned) VALUES ('stool', 25.99, TRUE);

-- 3) Add a product: table
INSERT INTO products (name, price, can_be_returned) VALUES ('table', 124.00, FALSE);

-- 4) Display all of the rows and columns in the table
SELECT * FROM products;

-- 5) Display all of the names of the products
--SELECT name FROM products;

-- 6) Display all of the names and prices of the products
--SELECT name, price FROM products;

-- 7) Add a new product (you can change this as desired)
--INSERT INTO products (name, price, can_be_returned) VALUES ('bookshelf', 79.99, TRUE);

-- 8) Display only the products that can_be_returned
--SELECT * FROM products WHERE can_be_returned = TRUE;

-- 9) Display only the products that have a price less than 44.00
--SELECT * FROM products WHERE price < 44.00;

-- 10) Display only the products that have a price in between 22.50 and 99.99
--SELECT * FROM products WHERE price BETWEEN 22.50 AND 99.99;

-- 11) Everything is $20 off (apply safely to maintain CHECK price > 0)
-- Use CASE to avoid violating the CHECK constraint (price must remain > 0)
--UPDATE products
--SET price = CASE WHEN price > 20 THEN price - 20 ELSE 0.01 END;
--SELECT id, name, price FROM products ORDER BY id;

-- 12) Remove all products whose price is less than $25
--DELETE FROM products WHERE price < 25;
--SELECT id, name, price FROM products ORDER BY id;

-- 13) Sale is over: increase remaining products by $20
--UPDATE products SET price = price + 20;
--SELECT id, name, price FROM products ORDER BY id;

-- 14) New company policy: everything is returnable
--UPDATE products SET can_be_returned = TRUE;
--SELECT id, name, price, can_be_returned FROM products ORDER BY id;


------ Note: The above queries from 5 to 14 are commented out.


---------------------------------------------------------------------
---------------------------------------------------------------------
-- queries_products_completed.sql
-- Working queries for the products table (queries 1-14)

-- Query 1: Add a product 'chair'
--INSERT INTO products (name, price, can_be_returned) VALUES ('chair', 44.00, FALSE);

-- Query 2: Add a product 'stool'
--INSERT INTO products (name, price, can_be_returned) VALUES ('stool', 25.99, TRUE);

-- Query 3: Add a product 'table'
--INSERT INTO products (name, price, can_be_returned) VALUES ('table', 124.00, FALSE);

-- Query 4: Display all rows and columns
--SELECT * FROM products;

-- Query 5: Display all product names
--SELECT name FROM products;

-- Query 6: Display all product names and prices
--SELECT name, price FROM products;

-- Query 7: Add a new product (example: bookshelf)
--INSERT INTO products (name, price, can_be_returned) VALUES ('bookshelf', 79.99, TRUE);

-- Query 8: Display only products that can_be_returned
--SELECT * FROM products WHERE can_be_returned = TRUE;

-- Query 9: Display only products with price < 44.00
--SELECT * FROM products WHERE price < 44.00;

-- Query 10: Display products with price between 22.50 and 99.99
--SELECT * FROM products WHERE price BETWEEN 22.50 AND 99.99;

-- Query 11: Everything is $20 off (safe update to keep price > 0)
--UPDATE products
--SET price = CASE WHEN price > 20 THEN price - 20 ELSE 0.01 END;

-- Query 12: Remove products whose price is less than $25
--DELETE FROM products WHERE price < 25;

-- Query 13: Sale is over — increase remaining products by $20
--UPDATE products SET price = price + 20;

-- Query 14: New policy — everything is returnable
--UPDATE products SET can_be_returned = TRUE;