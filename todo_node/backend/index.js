const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express();

// ✅ NO hardcoded values
const PORT = process.env.PORT;
const IMAGE_URL = process.env.IMAGE_URL;
const DATA_DIR = process.env.DATA_DIR;
const TEN_MIN = parseInt(process.env.IMAGE_CACHE_TIME, 10);
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
console.log('pool value from env ',pool);
console.log('port value from env ',PORT);
console.log('IMAGE_URL value from env ',IMAGE_URL);
console.log('DB_HOST value from env ',process.env.DB_HOST);
console.log('DB_PORT value from env ',process.env.DB_PORT);
console.log('DB_NAME value from env ',process.env.DB_NAME);
// Enable CORS explicitly before defining any routes
app.use(cors());

// Construct robust absolute paths using path.join and __dirname
const imagePath = path.join(__dirname, DATA_DIR, 'image.jpg');
const metaPath = path.join(__dirname, DATA_DIR, 'meta.json');
const initDB = async () => { await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL
    );
  `);
};

initDB();


function fetchImage(url = IMAGE_URL) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(imagePath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    https.get(url, (response) => {
      // Check if the server is trying to redirect us (Status 301 or 302)
      if (response.statusCode === 301 || response.statusCode === 302) {
        console.log("Following redirect to:", response.headers.location);
        // Recursively call fetchImage with the new redirect URL
        return fetchImage(response.headers.location).then(resolve).catch(reject);
      }

      const file = fs.createWriteStream(imagePath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        fs.writeFileSync(metaPath, JSON.stringify({ createdAt: Date.now() }));
        console.log("✅ New image downloaded successfully");
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(imagePath, () => {});
      reject(err);
    });
  });
}




function isValid() {
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath));
    return (Date.now() - meta.createdAt) < TEN_MIN;
  } catch {
    return false;
  }
}

// Endpoint
app.get('/image', async (req, res) => {
  try {
    if (!fs.existsSync(imagePath) || !isValid()) {
      await fetchImage();
    }
    // Crucial: Use path.resolve() to guarantee Express receives a clean absolute path
    res.sendFile(path.resolve(imagePath));
  } catch (error) {
    console.error("Backend processing error:", error);
    res.status(500).send("Internal Server Error processing image");
  }
});


app.use(express.json());

// ✅ GET todos
app.get('/todos', async (req, res) => {
const result = await pool.query('SELECT * FROM todos');
  res.json(result.rows);

});

// ✅ POST new todo
app.post('/todos', async (req, res) => {
  const todo = req.body.todo;

  if (!todo || todo.length > 140) {
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
  console.log(`Backend running on ${PORT}`);
});
