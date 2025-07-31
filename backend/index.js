const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET all products with department name
 */
app.get('/api/products', (req, res) => {
  const query = `
    SELECT products.id, products.name, products.description, products.price, departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * GET product by ID
 */
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = `
    SELECT products.id, products.name, products.description, products.price, departments.name AS department
    FROM products
    JOIN departments ON products.department_id = departments.id
    WHERE products.id = ?
  `;
  db.get(query, [productId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

/**
 * GET all departments with product count
 */
app.get('/api/departments', (req, res) => {
  const query = `
    SELECT d.id, d.name, COUNT(p.id) AS productCount
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * GET department by ID
 */
app.get('/api/departments/:id', (req, res) => {
  const deptId = req.params.id;
  db.get('SELECT * FROM departments WHERE id = ?', [deptId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.json(row);
  });
});

/**
 * GET all products in a department
 */
app.get('/api/departments/:id/products', (req, res) => {
  const deptId = req.params.id;
  const query = `
    SELECT d.name AS department, p.id, p.name, p.description, p.price
    FROM products p
    JOIN departments d ON p.department_id = d.id
    WHERE d.id = ?
  `;
  db.all(query, [deptId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'No products found in this department' });
    
    res.json({
      department: rows[0].department,
      products: rows.map(({ department, ...rest }) => rest)
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
