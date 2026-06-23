const http = require('http');

const PORT = process.env.PORT || 3008;

const randomString = Math.random().toString(36).substring(2);

// ✅ Call ping-pong service
const getPingCount = () => {
    console.log("Fetching ping count from ping-pong service...");
  return new Promise((resolve) => {
    http.get('http://ping-pong-svc/pings', (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      console.log("got ping count:", data);
    }).on('error', () => resolve('0')); // fallback
  });
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const timestamp = new Date().toISOString();

    const pingCount = await getPingCount();

    res.writeHead(200);
    res.end(`${timestamp}: ${randomString}\nPing / Pongs: ${pingCount}`);
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Log-output running on ${PORT}`);
});
