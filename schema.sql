DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cyberpunk 2077", "Video Games", 59.99, 200),
  ("Rocket League", "Video Games", 19.99, 175),
  ("Cheerios", "Food and Drink", 9.50, 50),
  ("Rollex Watch", "Apparel", 299.00, 5),
  ("Dickies Work Pants", "Apparel", 39.50, 35),
  ("Toilet Paper", "Necessities", 5.99, 3),
  ("Django: Unchained", "Films", 10.00, 15),
  ("Community: Seasons 1-6", "Films", 25.50, 10),
  ("Settlers of Catan", "Board Games", 29.99, 35),
  ("Sushi: Go", "Board Games", 15.95, 23);