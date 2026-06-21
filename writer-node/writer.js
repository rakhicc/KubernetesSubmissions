
const fs = require('fs');

const filePath = '/data/log.txt';

const randomString = Math.random().toString(36).substring(2);

setInterval(() => {
  const timestamp = new Date().toISOString();
  const line = `${timestamp}: ${randomString}\n`;

  fs.writeFileSync(filePath, line);
  console.log('Written:', line);
}, 5000);
