const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Generate random string at startup
const randomString = uuidv4();

const PORT = process.env.PORT || 3000;

// Keep latest timestamp in memory
let latestTimestamp = new Date().toISOString();

// Update timestamp every 5 seconds (for logs)
setInterval(() => {
  latestTimestamp = new Date().toISOString();
  console.log(`${latestTimestamp}: ${randomString}`);
}, 5000);

const server = http.createServer((req, res) => {
  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      timestamp: latestTimestamp,
      randomString: randomString
    }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Log Output App running');
  }
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});