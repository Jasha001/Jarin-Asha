const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const citySchema = new mongoose.Schema({
  name: String,
  mayor: String,
  population: Number
});

const City = mongoose.model('City', citySchema);

// Create
router.post('/', async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.send(`City with id ${req.params.id} deleted`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
