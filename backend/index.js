const db = require('./db');

db.all('SELECT * FROM products', (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log('All Products from DB:');
    console.log(rows);
  }
});
