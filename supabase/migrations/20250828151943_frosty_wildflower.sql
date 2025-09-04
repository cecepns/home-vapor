-- Home Vapor Database Schema
-- Created for Home Vapor E-commerce Website

CREATE DATABASE IF NOT EXISTS home_vapor_db;
USE home_vapor_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_price (price),
    INDEX idx_stock (stock),
    INDEX idx_created_at (created_at)
);

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Pod Systems', 'Compact and user-friendly vaping devices perfect for beginners and experienced users'),
('Mods', 'Advanced vaping devices with customizable settings and high power output'),
('Atomizers', 'High-quality atomizers and tanks for enhanced vaping experience'),
('E-Liquids', 'Premium e-liquids with various flavors and nicotine strengths'),
('Coils', 'Replacement coils for various vaping devices'),
('Accessories', 'Vaping accessories including batteries, chargers, and tools');

-- Insert Sample Products
INSERT INTO products (name, description, price, stock, category_id) VALUES
('SMOK Novo 4', '<p>The SMOK Novo 4 is a compact and stylish pod system that delivers exceptional performance. Features:</p><ul><li>25W max output</li><li>800mAh built-in battery</li><li>2ml pod capacity</li><li>Multiple coil options</li><li>Draw-activated firing</li></ul><p>Perfect for both beginners and experienced vapers looking for portability and convenience.</p>', 350000, 25, 1),

('Vaporesso XROS 3', '<p>The Vaporesso XROS 3 represents the latest in pod system technology:</p><ul><li>1000mAh battery capacity</li><li>Adjustable airflow</li><li>2ml pod capacity</li><li>Type-C fast charging</li><li>Leak-resistant design</li></ul><p>Experience smooth and consistent vapor production with this premium device.</p>', 420000, 18, 1),

('GeekVape Aegis Legend 2', '<p>The ultimate mod for serious vapers who demand durability and performance:</p><ul><li>200W max output</li><li>Dual 18650 batteries</li><li>IP68 waterproof rating</li><li>Shock and dust resistant</li><li>Advanced AS chipset</li></ul><p>Built to withstand extreme conditions while delivering exceptional vaping experience.</p>', 850000, 12, 2),

('Freemax Fireluke 3', '<p>Premium sub-ohm tank designed for cloud chasers and flavor enthusiasts:</p><ul><li>5ml e-liquid capacity</li><li>Top-fill design</li><li>Adjustable bottom airflow</li><li>Compatible with multiple coil series</li><li>Leak-proof construction</li></ul><p>Delivers intense flavor and massive vapor production.</p>', 280000, 30, 3),

('Salt Nic Premium 30ml', '<p>High-quality salt nicotine e-liquid available in multiple flavors:</p><ul><li>30ml bottle size</li><li>Available in 25mg and 50mg nicotine</li><li>Premium ingredients</li><li>Smooth throat hit</li><li>Various flavor options</li></ul><p>Perfect for pod systems and MTL devices.</p>', 85000, 50, 4),

('Mesh Coil Pack (5pcs)', '<p>High-performance mesh coils for enhanced flavor and vapor production:</p><ul><li>Pack of 5 coils</li><li>0.15Ω resistance</li><li>Compatible with multiple tanks</li><li>Long-lasting performance</li><li>Easy installation</li></ul><p>Replacement coils for optimal vaping experience.</p>', 120000, 40, 5);

-- Create indexes for better performance
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_price_stock ON products(price, stock);
CREATE INDEX idx_categories_name ON categories(name);

-- Create views for common queries
CREATE VIEW product_details AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.stock,
    p.image,
    p.created_at,
    p.updated_at,
    c.name as category_name,
    c.id as category_id
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Show table structure
DESCRIBE categories;
DESCRIBE products;

-- Show sample data
SELECT 'Categories:' as Info;
SELECT * FROM categories;

SELECT 'Products:' as Info;
SELECT * FROM product_details LIMIT 10;

-- Show statistics
SELECT 'Database Statistics:' as Info;
SELECT 
    (SELECT COUNT(*) FROM categories) as total_categories,
    (SELECT COUNT(*) FROM products) as total_products,
    (SELECT COUNT(*) FROM products WHERE stock <= 5) as low_stock_products,
    (SELECT SUM(price * stock) FROM products) as total_inventory_value;