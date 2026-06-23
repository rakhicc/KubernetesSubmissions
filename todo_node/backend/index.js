const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS explicitly before defining any routes
app.use(cors());

// Construct robust absolute paths using path.join and __dirname
const imagePath = path.join(__dirname, 'data', 'image.jpg');
const metaPath = path.join(__dirname, 'data', 'meta.json');
const TEN_MIN = 10 * 60 * 1000;

function fetchImage(url = 'https://picsum.photos/1200') {
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

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});
