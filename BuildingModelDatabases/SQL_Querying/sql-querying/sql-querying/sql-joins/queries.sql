-- write your queries here
--SELECT *
--FROM owners
--FULL OUTER JOIN vehicles 
--ON owners.id = vehicles.owner_id;


-- Count vehicles per owner

--psql -U postgres joins_exercise -f queries.sql

--SELECT owners.first_name, owners.last_name, COUNT(vehicles.id) AS count
--FROM owners
--LEFT JOIN vehicles ON owners.id = vehicles.owner_id
--GROUP BY owners.id, owners.first_name, owners.last_name
--ORDER BY owners.first_name;


-- Get owners with multiple vehicles and avg price > 10000
SELECT 
    owners.first_name, 
    owners.last_name, 
    ROUND(AVG(vehicles.price))::INTEGER as average_price, 
    COUNT(vehicles.id) as count
FROM owners
JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY owners.id, owners.first_name, owners.last_name
HAVING COUNT(vehicles.id) > 1 AND AVG(vehicles.price) > 10000
ORDER BY owners.first_name DESC;
