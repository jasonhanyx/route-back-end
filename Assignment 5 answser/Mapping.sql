-- create the database 
CREATE DATABASE musicana_db; 

-- at the database SQL:
-- create the users table 
CREATE TABLE users (
    id INT(12) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(111) NOT NULL,
    last_name VARCHAR(111),
    phone INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(64) NOT NULL
);

-- create the products table
CREATE TABLE products (
    id INT(12) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(111) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    price INT(12),
    isDeleted DATETIME DEFAULT NULL
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) SET NULL ON DELETE
);