const { v4: uuidv4 } = require('uuid');

// Generate random string at startup
const randomString = uuidv4();

// Print every 5 seconds
setInterval(() => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
}, 5000);