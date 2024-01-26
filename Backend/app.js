const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('initial commit');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
