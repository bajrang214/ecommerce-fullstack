const db = require('./db');

db.all(`SELECT * FROM departments`, (err, rows) => {
  if (err) console.error('Query error:', err.message);
  else console.log(rows);
});
