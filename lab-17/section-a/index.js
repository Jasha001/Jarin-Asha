const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Section A (PostgreSQL)');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
