const http = require('http');

const PORT = process.env.PORT || 3001;

let counter = 0;


const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    counter++;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`pong ${counter}`);
    return;  
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Ping-pong server running on port ${PORT}`);
});
    
