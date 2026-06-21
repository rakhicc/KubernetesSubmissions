const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const filePath = '/data/count.txt';

const randomString = Math.random().toString(36).substring(2);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const timestamp = new Date().toISOString();

    let count = 0;
    try {
      count = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      count = "0";
    }

    res.writeHead(200);
    res.end(`${timestamp}: ${randomString}\nPing / Pongs: ${count}`);
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Log-output running on ${PORT}`);
});