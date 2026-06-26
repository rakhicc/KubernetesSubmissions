const { Pool } = require('pg');
const express = require('express');
const app = express();

const port = process.env.PORT || 3007;
// Add this near your existing routes before your server listener
app.get('/', (req, res) => {
  console.log("Received request at /");
    res.status(200).send('OK');
});

// Database Connection configuration using Environment Variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


  app.get('/pingpong', async (req, res) => {
  try {
    console.log("Incrementing ping count in database...");
    // 1. Fetch current count value
    const result = await pool.query('SELECT count_value FROM counter_table WHERE id = 1;');
    let currentCount = result.rows[0].count_value;

    // 2. Increment it
    currentCount++;

    // 3. Update database
    await pool.query('UPDATE counter_table SET count_value = $1 WHERE id = 1;', [currentCount]);

    res.send(`pingpong ${currentCount}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection or query error');
  }
});

  // ✅ NEW endpoint for log-output
  app.get('/pings', async (req, res) => {
    try {
    console.log("Fetching ping count from database...");
      const result = await pool.query('SELECT count_value FROM counter_table WHERE id = 1;');
      res.send(result.rows[0].count_value.toString());
    } catch (err) {
      console.error(err);
      res.status(500).send('Database connection or query error');
    }
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
