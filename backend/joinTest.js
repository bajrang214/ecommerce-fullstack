const db = require('./db');

const query = `
  SELECT p.id, p.name, p.description, p.price, d.name AS department
  FROM products p
  JOIN departments d ON p.department_id = d.id;
`;

db.all(query, [], (err, rows) => {
  if (err) {
    console.error('Error executing JOIN query:', err.message);
  } else {
    console.log('🟢 Products with department names:\n');
    console.table(rows);
  }
});
