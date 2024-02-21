const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

// Initialize PostgreSQL client
// const pool = new Pool({
//   user: 'bobypoz',
//   host: 'localhost',
//   database: 'knjigovodstvo',
//   password: '$Boban986',
//   port: 5432,
// });

function connectToDatabase(databaseName) {
  return new Pool({
    user: 'bobypoz',
    host: 'localhost',
    database: databaseName,
    password: '$Boban986',
    port: 5432,
  });
}

let pool = connectToDatabase('companies');

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.options('*', cors());


async function countData(tableName) {
  try {
    const client = await pool.connect();
    const query = `SELECT COUNT(*) FROM ${tableName}`;
    console.log('Query:', query); // Print out the SQL query
    const result = await client.query(query);
    const count = parseInt(result.rows[0].count, 10); // Parse count as an integer
    client.release();
    return count; // Return the count value instead of the entire result object
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw new Error('Internal server error');
  }
}


async function getData(tableName) {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${tableName}`);
    const data = result.rows;
    client.release();
    return data;
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Internal server error');
  }
}

async function insertData(tableName, data) {
  try {
    if (!tableName) {
      throw new Error('Table name is required');
    }
    
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const client = await pool.connect();
    const result = await client.query(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`, values);
    client.release();
    
    return 'Data inserted successfully';
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to insert data backend');
  }
}

async function updateData(tableName, dataToUpdate, condition) {
  try {
    const setClause = Object.keys(dataToUpdate).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(dataToUpdate);
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`;
    const client = await pool.connect();
    await client.query(query, values);
    client.release();
    
    return 'Data updated successfully';
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Internal server error');
  }
}

async function deleteData(tableName, condition) {
  try {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;
    const client = await pool.connect();
    await client.query(query);
    client.release();
    
    return 'Data deleted successfully';
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Internal server error');
  }
}

// Route to retrieve data
app.get('/countData', async (req, res) => {
  try {
    const { tableName } = req.query;
    const data = await countData(tableName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/getData/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const data = await getData(tableName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to insert data
app.post('/insertData', async (req, res) => {
  try {
    const { tableName, data } = req.body;
    const message = await insertData(tableName, data);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update data
app.put('/updateData/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const { dataToUpdate, condition } = req.body;
    const message = await updateData(tableName, dataToUpdate, condition);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to delete data
app.delete('/deleteData/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const { condition } = req.body;
    const message = await deleteData(tableName, condition);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/switchDatabase', (req, res) => {
  const { databaseName } = req.body;
  pool = connectToDatabase(databaseName);
  res.status(200).send(`Switched to database: ${databaseName}`);
});

app.get('/getCompanies', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT company_id, company_name, company_db FROM company_info');
    const companies = result.rows;
    client.release();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/createCompany', async (req, res) => {
  try {
    const { companyName } = req.body;

    // Create new database
    await pool.query(`CREATE DATABASE ${companyName}`);

    // Insert record into companies database
    await pool.query('INSERT INTO company_info (company_name, company_db) VALUES ($1, $2)', [companyName, companyName]);

    res.status(200).json({ message: 'Company created successfully' });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

module.exports = {
  countData,
  getData,
  insertData,
  updateData,
  deleteData,
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
