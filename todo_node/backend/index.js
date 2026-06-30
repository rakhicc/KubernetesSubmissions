const express = require('express');
const cors = require('cors');

const app = express();

// ✅ NO hardcoded values
const PORT = process.env.PORT;
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Enable CORS explicitly before defining any routes
app.use(cors());


const initDB = async () => { await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL
    );
  `);
};

initDB();




app.use(express.json());

// ✅ ADD THIS HEALTH CHECK ROUTE (GKE Ingress checks GET / by default)
app.get('/', (req, res) => {
  res.status(200).send('Backend is healthy');
});
// ✅ GET todos
app.get('/todos', async (req, res) => {
const result = await pool.query('SELECT * FROM todos');
  res.json(result.rows);

});

// ✅ POST new todo
app.post('/todos', async (req, res) => {
  const todo = req.body.todo;
  console.log("Received new todo:", todo);

  if (!todo || todo.length > 140) {
     console.log("todo length exceeded 140 characters");
    return res.status(400).json({ error: 'Invalid todo' });
  }

const result = await pool.query(
    'INSERT INTO todos (text) VALUES ($1) RETURNING *',
    [todo]
  );
  console.log("Inserted todo into database and results is:", result);
console.log("Inserted todo into database:", result.rows[0]);
  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log('New logic initialized');
  console.log('workflow initialized');
  console.log('workflow testing progress deployment name corrected');
  console.log('image resource removed');
  console.log(`Backend running on ${PORT}`);
});
