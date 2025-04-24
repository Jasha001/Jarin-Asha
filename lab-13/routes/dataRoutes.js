const express = require('express');
const router = express.Router();
const data = require('../data.json');

// 1. Basic Route - Get All Items
router.get('/', (req, res) => {
  res.json(data);
});

// 2. Dynamic Route - Get Item by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// 3. Subroutes - Get Details of a specific item
router.get('/:id/details', (req, res) => {
  const id = req.params.id;
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json({ id: item.id, name: item.name, details: item.details });
  } else {
    res.status(404).json({ error: "Details not found" });
  }
});

// 4. Wildcard Route - Get any unmatched routes under '/data'
router.get('*', (req, res) => {
  res.status(404).json({ error: "Wildcard: No matching route" });
});

// 5. Regular Expression Route - Only allow alphanumeric IDs
router.get('/regex/:id([a-zA-Z0-9]+)', (req, res) => {
  const id = req.params.id;
  const item = data.find(d => d.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

module.exports = router;
