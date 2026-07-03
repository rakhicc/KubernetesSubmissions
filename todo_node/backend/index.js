const express = require('express');
const cors = require('cors');

const app = express();

// ✅ NO hardcoded values
const PORT = process.env.PORT;
const { Pool } = require('pg');
let isHealthy = true;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Enable CORS explicitly before defining any routes
app.use(cors());


const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      done BOOLEAN DEFAULT FALSE
    );
  `);

  // For existing databases where the column doesn't exist yet
  await pool.query(`
    ALTER TABLE todos
    ADD COLUMN IF NOT EXISTS done BOOLEAN DEFAULT FALSE;
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

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE todos
      SET done = TRUE
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
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

app.get('/healthz', async (req, res) => {
  console.log("Health check endpoint called");
  try {
    
    await pool.query('SELECT 1');

    if (!isHealthy) {
      return res.status(500).json({
        status: 'unhealthy'
      });
    }

    return res.status(200).json({
      status: 'ok'
    });

  } catch (err) {
    return res.status(503).json({
      status: 'database unavailable'
    });
  }
});

app.post('/break', (req, res) => 
  {  isHealthy = false;
     res.json(
      {  message: 'Application broken' });
    });

    app.get('/status', (req, res) => {
       res.json({   healthy: isHealthy  });});
app.listen(PORT, () => {
  console.log('New logic initialized');
  console.log('workflow initialized');
  console.log('workflow testing progress image names set correctly');
  console.log('image resource removed');
  console.log(`Backend running on ${PORT}`);
});
