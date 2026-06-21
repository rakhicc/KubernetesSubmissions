const http = require('http');
const fs = require('fs');

const PORT = 3000;
const filePath = '/data/log.txt';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    let content = 'No data yet';

    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.log('No log file found yet');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(content);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Reader running on ${PORT}`);
});