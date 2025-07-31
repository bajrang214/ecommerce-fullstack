const sqlite3 = require('sqlite3').verbose();

// Just connect to the DB — no schema change
const db = new sqlite3.Database('./ecommerce.db');

module.exports = db;
