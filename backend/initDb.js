const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS products`);
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      price REAL,
      department TEXT
    )
  `, () => {
    console.log("✅ Database initialized and 'products' table created.");
    db.close();
  });
});
