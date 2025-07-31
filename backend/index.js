const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 📦 GET all products with department name
app.get('/api/products', (req, res) => {
  const query = `
    SELECT 
      products.id, 
      products.name, 
      products.description, 
      products.price, 
      departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 🔍 GET single product by ID with department name
app.get('/api/products/:id', (req, res) => {
  const query = `
    SELECT 
      products.id, 
      products.name, 
      products.description, 
      products.price, 
      departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
    WHERE products.id = ?
  `;

  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
