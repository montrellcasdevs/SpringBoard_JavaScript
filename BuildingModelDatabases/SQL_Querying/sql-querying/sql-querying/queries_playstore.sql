-- Playstore Analytics Queries

-- Query 1: Find the app with an ID of 1880
SELECT * FROM analytics WHERE id = 1880;
/*
-- Query 2: Find the ID and app name for all apps last updated on August 01, 2018
SELECT id, app_name 
FROM analytics 
WHERE last_updated = '2018-08-01';

-- Query 3: Count the number of apps in each category
SELECT category, COUNT(*) as app_count 
FROM analytics 
GROUP BY category 
ORDER BY category;

-- Query 4: Find the top 5 most-reviewed apps and the number of reviews
-- Based on sample data, this should include Facebook, WhatsApp, Instagram, etc.
SELECT app_name, reviews 
FROM analytics 
ORDER BY reviews DESC 
LIMIT 5;

-- Query 5: Find the app with most reviews that has rating >= 4.8
-- Looking at real data which shows ratings mostly between 4.0-4.7
SELECT app_name, reviews, rating 
FROM analytics 
WHERE rating >= 4.8 
ORDER BY reviews DESC 
LIMIT 1;

-- Query 6: Find average rating for each category, ordered highest to lowest
-- Categories in data are uppercase like 'SOCIAL', 'COMMUNICATION'
SELECT category, ROUND(AVG(rating)::numeric, 2) as avg_rating 
FROM analytics 
WHERE rating IS NOT NULL 
GROUP BY category 
ORDER BY avg_rating DESC;

-- Query 7: Find name, price, and rating of most expensive app rated < 3
-- Note: Many apps are free (price = 0)
SELECT app_name, price, rating 
FROM analytics 
WHERE rating < 3 
ORDER BY price DESC 
LIMIT 1;

-- Query 8: Find apps with min_install <= 50 with rating, ordered by rating highest first
-- Note: Sample shows most apps have 100,000+ installs minimum
SELECT app_name, rating, min_installs 
FROM analytics 
WHERE min_installs <= 50 
  AND rating IS NOT NULL 
ORDER BY rating DESC;

-- Query 9: Find names of all apps rated < 3 with at least 10000 reviews
-- Note: Sample data shows most popular apps have millions of reviews
SELECT app_name, rating, reviews 
FROM analytics 
WHERE rating < 3 
  AND reviews >= 10000;

-- Query 10: Find top 10 most-reviewed apps costing between $0.10 and $1.00
-- Note: Sample shows many apps are free (price = 0)
SELECT app_name, price, reviews 
FROM analytics 
WHERE price BETWEEN 0.10 AND 1.00 
ORDER BY reviews DESC 
LIMIT 10;

-- Query 11: Find most out of date app (oldest last_updated)
-- Sample data shows dates around July-August 2018
SELECT app_name, last_updated 
FROM analytics 
ORDER BY last_updated ASC 
LIMIT 1;

-- Query 12: Find most expensive app
-- Note: Many apps in sample are free
SELECT app_name, price 
FROM analytics 
ORDER BY price DESC 
LIMIT 1;

-- Query 13: Count all reviews in the Google Play Store
-- Sample shows individual apps with millions of reviews
SELECT SUM(reviews) as total_reviews 
FROM analytics;

-- Query 14: Find categories with more than 300 apps
-- Sample shows categories like 'SOCIAL', 'COMMUNICATION', 'GAME'
SELECT category, COUNT(*) as app_count 
FROM analytics 
GROUP BY category 
HAVING COUNT(*) > 300 
ORDER BY app_count DESC;

-- Query 15: Find app with highest proportion of min_installs to reviews
-- Sample shows min_installs in millions (1000000000) for popular apps
SELECT app_name, 
       reviews, 
       min_installs,
       ROUND(CAST(min_installs AS FLOAT) / NULLIF(reviews, 0), 2) as proportion
FROM analytics
WHERE min_installs >= 100000
ORDER BY proportion DESC
LIMIT 1;

-- Query 9: Find names of all apps rated < 3 with at least 10000 reviews
SELECT app_name, rating, reviews 
FROM analytics 
WHERE rating < 3 
  AND reviews >= 10000;

-- Query 10: Find top 10 most-reviewed apps costing between $0.10 and $1.00
SELECT app_name, price, reviews 
FROM analytics 
WHERE price BETWEEN 0.10 AND 1.00 
ORDER BY reviews DESC 
LIMIT 10;

-- Query 11: Find most out of date app (oldest last_updated)
SELECT app_name, last_updated 
FROM analytics 
ORDER BY last_updated ASC 
LIMIT 1;

-- Query 12: Find most expensive app
SELECT app_name, price 
FROM analytics 
ORDER BY price DESC 
LIMIT 1;

-- Query 13: Count all reviews
SELECT SUM(reviews) as total_reviews 
FROM analytics;

-- Query 14: Find categories with more than 300 apps
SELECT category, COUNT(*) as app_count 
FROM analytics 
GROUP BY category 
HAVING COUNT(*) > 300 
ORDER BY app_count DESC;

-- Query 15: Find app with highest proportion of min_installs to reviews
SELECT app_name, 
       reviews, 
       min_installs,
       ROUND(CAST(min_installs AS FLOAT) / NULLIF(reviews, 0), 2) as proportion
FROM analytics
WHERE min_installs >= 100000
ORDER BY proportion DESC
LIMIT 1;
*/