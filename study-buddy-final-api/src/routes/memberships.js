const express = require('express');
const router = express.Router();
const db = require('../database');
const authMiddleware = require('../middleware/auth');

// Join a group
router.post('/:groupId/join', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const groupId = req.params.groupId;
  try {
    const result = await db.query(
      'INSERT INTO memberships (user_id, study_group_id) VALUES ($1, $2) RETURNING *',
      [userId, groupId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Already joined or invalid group' });
  }
});

// Leave a group
router.delete('/:groupId/leave', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const groupId = req.params.groupId;
  await db.query('DELETE FROM memberships WHERE user_id = $1 AND study_group_id = $2', [userId, groupId]);
  res.sendStatus(204);
});

module.exports = router;
