const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');

function loadCSV() {
  const products = [];

  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log('Parsed Row:', row);  // 👈 ADD THIS
      products.push(row);
    })
    .on('end', () => {
      const stmt = db.prepare(`INSERT INTO products (id, name, description, price, department) VALUES (?, ?, ?, ?, ?)`);
      products.forEach(p => {
        console.log('Inserting:', p);  // 👈 ADD THIS
        stmt.run(p.id, p.name, p.description, parseFloat(p.price), p.department);
      });
      stmt.finalize(() => {
        console.log('CSV data loaded into database.');
      });
    });
}

loadCSV();
