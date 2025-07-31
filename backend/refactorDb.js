const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

db.serialize(() => {
  // Drop old tables
  db.run('DROP TABLE IF EXISTS products');
  db.run('DROP TABLE IF EXISTS departments');

  // Create departments table
  db.run(`
    CREATE TABLE departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `);

  // Create products table with foreign key
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      department_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id)
    )
  `);
});

console.log('✅ Database refactored with departments table.');
