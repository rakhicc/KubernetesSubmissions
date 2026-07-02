const http = require('http');

const PORT = process.env.PORT || 3008;

const randomString = Math.random().toString(36).substring(2);
const fs = require('fs');
const fileContentPath = '/etc/config/information.txt';

// ✅ Call ping-pong service
const getPingCount = () => {
    console.log("Fetching ping count from ping-pong service...");
  return new Promise((resolve) => {
    http.get('http://ping-pong-svc:80/pings', (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      console.log("got ping count:", data);
    }).on('error', () => resolve('0')); // fallback
  });
};


const server = http.createServer(async (req, res) => {
  // 2. FIXED: Added native GKE Ingress Root / Health Check Handler
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
if (req.url === '/health') {
     try {const pingCount = await getPingCount();
           // If ping-pong is reachable, we're ready8     
            if (pingCount !== '0') {
                  res.writeHead(200);       
                  res.end('Ready');    } else {
                          res.writeHead(503);       
                          res.end('Not Ready');     }   
                        } catch (err) {  
                                res.writeHead(503);    
                                 res.end('Not Ready');    }    
                                 return;  
                                }
  if (req.url === '/logoutput') {
    const timestamp = new Date().toISOString();

    const pingCount = await getPingCount();

    let fileContent = "file not found";

    try {
      fileContent = fs.readFileSync(fileContentPath, 'utf8');
    } catch (e) {}

    const message = process.env.MESSAGE || "no message";

    res.writeHead(200);
    
res.end(
      `file content: ${fileContent}\n` +
      `env variable: MESSAGE=${message}\n` +
      `${timestamp}: ${randomString}\n` +
      `Ping / Pongs: ${pingCount}`
    );
return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Log-output running on ${PORT}`);
});
