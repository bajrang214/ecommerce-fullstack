const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

const PORT = 5000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// 🔁 GET all products with department name using JOIN
app.get('/api/products', (req, res) => {
  const query = `
    SELECT products.id, products.name, products.description, products.price, departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
  `;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// 🔁 GET single product by ID with department name
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = `
    SELECT products.id, products.name, products.description, products.price, departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
    WHERE products.id = ?
  `;

  db.get(query, [productId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(row);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
