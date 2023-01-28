-- Comments in SQL Start with dash-dash --

\c playstore

SELECT * FROM analytics WHERE id = 1880;

SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';

SELECT category, COUNT(*) FROM analytics GROUP BY category;

SELECT app_name, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;

SELECT * FROM analytics WHERE rating >= 4.8 ORDER BY rating;

SELECT category, AVG(rating) FROM analytics GROUP BY category ORDER BY AVG(rating) DESC;

SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price DESC LIMIT 1;

SELECT * FROM analytics WHERE rating > 0 AND min_installs <= 50 ORDER BY rating DESC;

SELECT app_name FROM analytics WHERE rating < 3 AND reviews >= 10000;

SELECT * FROM analytics WHERE price BETWEEN 0.1 AND 1 ORDER BY reviews DESC LIMIT 10;

SELECT * FROM analytics ORDER BY last_updated LIMIT 1;

SELECT * FROM analytics ORDER BY price DESC LIMIT 1;

SELECT SUM(reviews) FROM analytics;

SELECT category, COUNT(*) FROM analytics GROUP BY category HAVING COUNT(*) > 300;

SELECT app_name, reviews, min_installs, min_installs/reviews FROM analytics WHERE min_installs >= 100000
    ORDER BY min_installs/reviews DESC LIMIT 1;