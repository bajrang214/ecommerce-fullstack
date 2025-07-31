const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');
const fs = require('fs');
const csv = require('csv-parser');

const products = [];

fs.createReadStream('./products.csv')
  .pipe(csv())
  .on('data', (row) => {
    products.push(row);
  })
  .on('end', () => {
    products.forEach((product) => {
      const { id, name, description, price, department } = product;

      // Step 1: Insert department if not exists
      db.run(
        `INSERT OR IGNORE INTO departments (name) VALUES (?)`,
        [department],
        function (err) {
          if (err) return console.error('Department error:', err.message);

          // Step 2: Get department_id
          db.get(
            `SELECT id FROM departments WHERE name = ?`,
            [department],
            (err, row) => {
              if (err) return console.error('Select dept error:', err.message);

              const departmentId = row.id;

              // Step 3: Insert product with department_id
              db.run(
                `INSERT INTO products (id, name, description, price, department_id) VALUES (?, ?, ?, ?, ?)`,
                [id, name, description, price, departmentId],
                (err) => {
                  if (err) console.error('Product insert error:', err.message);
                }
              );
            }
          );
        }
      );
    });

    console.log('✅ CSV data loaded with refactored schema.');
  });
