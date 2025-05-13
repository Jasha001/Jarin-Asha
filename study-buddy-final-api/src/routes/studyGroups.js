const express = require('express');
const router = express.Router();
const db = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all groups
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM study_groups');
  res.json(result.rows);
});

// Create a group
router.post('/', authMiddleware, async (req, res) => {
  const { name, course_code, description } = req.body;
  const userId = req.user.id;
  const result = await db.query(
    'INSERT INTO study_groups (name, course_code, description, creator_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, course_code, description, userId]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;
