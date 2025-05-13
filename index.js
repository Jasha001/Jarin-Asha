const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cityRoutes = require('./routes');

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/citiesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/cities', cityRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Section B (MongoDB)');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
