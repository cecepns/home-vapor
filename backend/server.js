const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads-home-vapor', express.static(path.join(__dirname, 'uploads-home-vapor')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads-home-vapor');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'home_vapor_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads-home-vapor/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ==================== CATEGORIES ROUTES ====================

// Get all categories
app.get('/api/categories', (req, res) => {
  const query = `
    SELECT c.*, COUNT(p.id) as product_count 
    FROM categories c 
    LEFT JOIN products p ON c.id = p.category_id 
    GROUP BY c.id 
    ORDER BY c.name
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json({ categories: results });
  });
});

// Create category
app.post('/api/categories', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  
  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  db.query(query, [name, description || null], (err, result) => {
    if (err) {
      console.error('Error creating category:', err);
      return res.status(500).json({ error: 'Failed to create category' });
    }
    res.json({ message: 'Category created successfully', id: result.insertId });
  });
});

// Update category
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  
  const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description || null, id], (err, result) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ error: 'Failed to update category' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ message: 'Category updated successfully' });
  });
});

// Delete category
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  
  // Check if category has products
  db.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error checking category products:', err);
      return res.status(500).json({ error: 'Failed to check category' });
    }
    
    if (results[0].count > 0) {
      return res.status(400).json({ error: 'Cannot delete category with existing products' });
    }
    
    // Delete category
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting category:', err);
        return res.status(500).json({ error: 'Failed to delete category' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json({ message: 'Category deleted successfully' });
    });
  });
});

// ==================== PRODUCTS ROUTES ====================

// Get all products with pagination
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const category = req.query.category || '';
  const search = req.query.search || '';
  const offset = (page - 1) * limit;
  
  let whereClause = '';
  let queryParams = [];
  let conditions = [];
  
  if (category) {
    conditions.push('p.category_id = ?');
    queryParams.push(category);
  }
  
  if (search) {
    // Use case-insensitive search with word boundaries for more precise matching
    conditions.push('(LOWER(p.name) LIKE ? OR LOWER(p.description) LIKE ?)');
    const searchTerm = search.toLowerCase();
    queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
  }
  
  if (conditions.length > 0) {
    whereClause = 'WHERE ' + conditions.join(' AND ');
  }
  
  // Get total count
  const countQuery = `SELECT COUNT(*) as total FROM products p ${whereClause}`;
  db.query(countQuery, queryParams, (err, countResult) => {
    if (err) {
      console.error('Error counting products:', err);
      return res.status(500).json({ error: 'Failed to count products' });
    }
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Get products
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ${whereClause}
      ORDER BY p.created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    queryParams.push(limit, offset);
    
    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      
      res.json({
        products: results,
        currentPage: page,
        totalPages: totalPages,
        total: total
      });
    });
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.id = ?
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ product: results[0] });
  });
});

// Create product
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  
  if (!name || !price || !stock || !category_id) {
    return res.status(400).json({ error: 'Name, price, stock, and category are required' });
  }
  
  const query = 'INSERT INTO products (name, description, price, stock, category_id, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description || null, parseFloat(price), parseInt(stock), parseInt(category_id), image], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      return res.status(500).json({ error: 'Failed to create product' });
    }
    res.json({ message: 'Product created successfully', id: result.insertId });
  });
});

// Update product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  
  if (!name || !price || !stock || !category_id) {
    return res.status(400).json({ error: 'Name, price, stock, and category are required' });
  }
  
  // Get current product to handle image deletion
  db.query('SELECT image FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching current product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const currentImage = results[0].image;
    let updateQuery, queryParams;
    
    if (image) {
      // Delete old image if exists
      if (currentImage) {
        const oldImagePath = path.join(__dirname, 'uploads-home-vapor', currentImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      updateQuery = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, image = ? WHERE id = ?';
      queryParams = [name, description || null, parseFloat(price), parseInt(stock), parseInt(category_id), image, id];
    } else {
      updateQuery = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?';
      queryParams = [name, description || null, parseFloat(price), parseInt(stock), parseInt(category_id), id];
    }
    
    db.query(updateQuery, queryParams, (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        return res.status(500).json({ error: 'Failed to update product' });
      }
      
      res.json({ message: 'Product updated successfully' });
    });
  });
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  // Get product to delete image
  db.query('SELECT image FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const image = results[0].image;
    
    // Delete product
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Failed to delete product' });
      }
      
      // Delete image file if exists
      if (image) {
        const imagePath = path.join(__dirname, 'uploads-home-vapor', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      res.json({ message: 'Product deleted successfully' });
    });
  });
});

// ==================== DASHBOARD ROUTES ====================

// Get dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  const queries = {
    totalProducts: 'SELECT COUNT(*) as count FROM products',
    totalCategories: 'SELECT COUNT(*) as count FROM categories',
    lowStockProducts: 'SELECT COUNT(*) as count FROM products WHERE stock <= 5',
    totalValue: 'SELECT SUM(price * stock) as total FROM products'
  };
  
  const stats = {};
  let completed = 0;
  const total = Object.keys(queries).length;
  
  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, results) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        stats[key] = 0;
      } else {
        stats[key] = key === 'totalValue' ? results[0].total || 0 : results[0].count;
      }
      
      completed++;
      if (completed === total) {
        res.json({ stats });
      }
    });
  });
});

// ==================== ERROR HANDLING ====================

// Handle multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});