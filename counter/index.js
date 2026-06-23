const http = require('http');

const PORT = process.env.PORT || 3007;

let counter = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    counter++;
    res.writeHead(200);
    res.end(`pong ${counter}`);
    return;
  }

  // ✅ NEW endpoint for log-output
  if (req.url === '/pings') {
    res.writeHead(200);
    res.end(counter.toString()); // ✅ return count only
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Ping-pong running on ${PORT}`);
});
