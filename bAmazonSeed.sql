DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stuffed animal", "kids", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("keychain", "automotive accesories", 2.25, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ipad","electronics", 999.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone mount","automotive accesories", 45, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chris","people", 49000.21, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("42 inch TV","electronics", 245.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Enery Drink","food and drink", 3.50, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coke","food and drink", 2, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave Dinner 5 pack","food and drink", 39.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cup o Noodles","food and drink", .85, 75);