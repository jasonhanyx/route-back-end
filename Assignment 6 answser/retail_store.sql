-- 1)
-- FIRST
CREATE DATABASE retail_store

-- SECOND
CREATE TABLE suppliers (
    supplierId INT(12) AUTO_INCREMENT PRIMARY KEY,
    supplierName VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(100)
);

CREATE TABLE products (
    productId INT(12) AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    price decimal(10,2),
    stockQuantity INT(12),
    supplierId INT(12), 
    FOREIGN KEY (supplierId) REFERENCES suppliers(supplierId)
);

CREATE TABLE sales (
    saleId INT(12) AUTO_INCREMENT PRIMARY KEY,
    productId INT(12),
    FOREIGN KEY (productId) REFERENCES products(productId),
    quantitySold INT(12),
    saleDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- then
-- 2)
ALTER TABLE products
ADD category VARCHAR(100);

-- 3)
ALTER TABLE products
DROP COLUMN category;

-- 4)
ALTER TABLE suppliers
MODIFY contactNumber VARCHAR(15);

-- 5)
ALTER TABLE Products
MODIFY ProductName VARCHAR(100) NOT NULL;

-- 6)
-- A
INSERT INTO suppliers (supplierName, contactNumber)
VALUES (SupplierName, ContactNumber);
-- B
INSERT INTO products (productName, price, stockQuantity, supplierID)
VALUES
('Milk', 15.00, 50,(SELECT supplierID FROM suppliers WHERE supplierName='FreshFoods')),
('Bread', 10.00, 30,(SELECT supplierID FROM suppliers WHERE supplierName='FreshFoods')),
('Eggs', 20.00, 40,(SELECT supplierID FROM suppliers WHERE supplierName='FreshFoods'));
-- C
INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (
    (SELECT ProductID FROM Products WHERE ProductName='Milk'),2,'2025-05-20'
);

-- 7)
UPDATE products 
SET price = 25.00 WHERE productName = 'Bread';

-- 8)
DELETE FROM products
WHERE productName = 'Eggs';

-- 9)
SELECT products.productName , SUM(sales.quantitySold) AS totalQuantitySold
FROM products
JOIN sales
ON products.productId = sales.productId

-- 10)
SELECT * FROM Products
ORDER BY StockQuantity DESC;

-- 11)
SELECT * FROM suppliers
WHERE supplierName LIKE 'F%';

-- 12)
SELECT * FROM Products
WHERE ProductID NOT IN (
    SELECT ProductID FROM Sales
);

-- 13)
SELECT products.productName , sales.saleDate
FROM products
JOIN sales
ON products.productId = sales.productId

-- 14)
CREATE USER 'store-manager'@'localhost'
IDENTIFIED BY '239ME8923';

GRANT SELECT, INSERT, UPDATE ON retail_store.*
TO 'store-manager'@'localhost';

FLUSH PRIVILEGES;

-- 15)
REVOKE UPDATE ON retail_store.*
FROM 'store-manager'@'localhost';

FLUSH PRIVILEGES;

-- 16)
GRANT DELETE ON retail_store.sales
TO 'store-manager'@'localhost';

FLUSH PRIVILEGES;
