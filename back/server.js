const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Initialize PostgreSQL client
const pool = new Pool({
  user: 'bobypoz',
  host: 'localhost',
  database: 'knjigovodstvo',
  password: '$Boban986',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM kupci');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
