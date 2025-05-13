const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'patients',
  password: 'your_password',
  port: 5432,
});

// Create
router.post('/', async (req, res) => {
  const { name, age, condition } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO patients (name, age, condition) VALUES ($1, $2, $3) RETURNING *',
      [name, age, condition]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, condition } = req.body;
  try {
    const result = await pool.query(
      'UPDATE patients SET name = $1, age = $2, condition = $3 WHERE id = $4 RETURNING *',
      [name, age, condition, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM patients WHERE id = $1', [id]);
    res.send(`Patient with id ${id} deleted`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
