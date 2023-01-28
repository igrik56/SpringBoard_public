-- Comments in SQL Start with dash-dash --
-- write your queries here
\c products_db          --selecting products_db 


-- Inserting DATA
INSERT INTO products (name, price, can_be_returned) VALUES ('chair', '44.00', false); 
INSERT INTO products (name, price, can_be_returned) VALUES ('stool', '25.99', true);
INSERT INTO products (name, price, can_be_returned) VALUES ('table', '124.00', false);

-- Show the entire table, Show only name of all products, Show name and price of all products
SELECT * FROM products;
SELECT name FROM products;  
SELECT name, price FROM products;  

-- Inserting DATA
INSERT INTO products (name, price, can_be_returned) VALUES ('door', '60', false);    

-- Show name and price of all products that can be returned
SELECT name, price FROM products 
    WHERE can_be_returned = True;

-- Show name and price of all products with price less than $44.00
SELECT name, price FROM products
    WHERE price < 44.00;

-- Show name and price of all products with price between 22.5 and $99.99
SELECT name, price FROM products
    WHERE price BETWEEN 22.5 AND 99.99;

-- Update price on all produtcs. $20 off.
UPDATE products SET price = price-20;

-- Deleting products with price lower thatn $25.
DELETE FROM products WHERE price < 25;

-- Update price on all products. $20 increase.
UPDATE products SET price = price+20;

-- Update all products. Can be returned. 
UPDATE products SET can_be_returned = True;