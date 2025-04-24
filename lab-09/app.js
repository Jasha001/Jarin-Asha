const express = require('express');
const app = express();
app.use(express.json());

const fortunes = [
  "You will have a great day!",
  "If you don't have time to do it right the first time, what makes you think you'll have time to redo it?",
  "A surprise is waiting for you around the corner.",
  "You cannot act on what you haven't imagined.",
  "Good fortune is coming your way.",
  "Practice does not make perfect. Perfect practice makes perfect.",
  "Your hard work will soon pay off.",
  "Don't comment bad code, rewrite it.",
  "You can have anything you want, but not everything you want.",
  "The best time to plant a tree is 20 years ago. The second best time is now.",
  "When life gives you lemons, you can only make lemonade if life also gives you a lot of sugar.",
  "An exciting opportunity lies ahead.",
  "When you die and your life flashes before your eyes, you are going to have to sit through several ads",
  "The wish is the father of the thought",
  "Loneliness isn't the absence of people but the absence of meaning"
];

// GET route with query parameter and optional path parameter
app.get('/fortunes/:id?', (req, res) => {
  const id = req.params.id || req.query.id;
  if (id !== undefined) {
    const index = parseInt(id);
    if (!isNaN(index) && index >= 0 && index < fortunes.length) {
      return res.json({ fortune: fortunes[index] });
    } else {
      return res.status(400).json({ error: 'Invalid fortune ID' });
    }
  }

  const count = parseInt(req.query.count);
  if (!isNaN(count)) {
    const selected = fortunes.slice(0, count);
    return res.json({ fortunes: selected });
  } else {
    const random = Math.floor(Math.random() * fortunes.length);
    return res.json({ fortune: fortunes[random] });
  }
});

// POST route to accept name/message
app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  res.json({ success: true, response: `Thanks, ${name}! Your message was: "${message}"` });
});

// Challenge: POST route to add new fortunes
app.post('/fortunes', (req, res) => {
  const { newFortune } = req.body;
  if (!newFortune || typeof newFortune !== 'string') {
    return res.status(400).json({ error: 'Invalid fortune input' });
  }
  fortunes.push(newFortune);
  res.json({ success: true, message: 'Fortune added!', index: fortunes.length - 1 });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
