const express = require('express');

const app = express();

const MESSAGE = process.env.MESSAGE || 'Hello';

app.get('/', (req, res) => {
  res.send(MESSAGE);
});

app.listen(3000, () => {
  console.log('Greeter running on port 3000');
});