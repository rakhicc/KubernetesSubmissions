const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

const CACHE_DIR = "/cache";
const IMAGE_PATH = path.join(CACHE_DIR, "image.jpg");
const META_PATH = path.join(CACHE_DIR, "meta.json");

const TEN_MINUTES = 10 * 60 * 1000;

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getMeta() {
  if (!fs.existsSync(META_PATH)) return null;
  return JSON.parse(fs.readFileSync(META_PATH));
}

async function downloadImage() {
  const response = await fetch("https://picsum.photos/1200?random=" + Date.now());
  console.log("https://picsum.photos/1200?random=" + Date.now());
  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(IMAGE_PATH, buffer);
  fs.writeFileSync(META_PATH, JSON.stringify({ timestamp: Date.now() }));
}

app.get("/api/image", async (req, res) => {
  let meta = getMeta();
  const now = Date.now();

  if (!meta || (now - meta.timestamp) > TEN_MINUTES) {
    console.log("Fetching new image...");
    await downloadImage();
  } else {
    console.log("Using cached image...");
  }

  res.sendFile(IMAGE_PATH);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});