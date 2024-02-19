const { Pool } = require('pg');

const pool = new Pool({
  user: 'bobypoz',
  host: 'localhost',
  database: 'knjigovodstvo',
  password: '$Boban986',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
  pool.end();
});