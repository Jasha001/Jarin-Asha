const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Load candidate data from JSON file
let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Fictitious Political Candidates Server');
});

// /search route with query parameters
app.get('/search', (req, res) => {
  const { party, platform } = req.query;
  let filteredCandidates = candidates;
  if (party) {
    filteredCandidates = filteredCandidates.filter(c => c.party === party);
  }
  if (platform) {
    filteredCandidates = filteredCandidates.filter(c => c.platform.includes(platform));
  }
  if (filteredCandidates.length > 0) {
    res.json(filteredCandidates);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// /filter POST route with JSON body
app.post('/filter', (req, res) => {
  const { platform, slogan } = req.body;
  let filteredCandidates = candidates;
  if (platform) {
    filteredCandidates = filteredCandidates.filter(c => c.platform.includes(platform));
  }
  if (slogan) {
    filteredCandidates = filteredCandidates.filter(c => c.slogan.includes(slogan));
  }
  if (filteredCandidates.length > 0) {
    res.json(filteredCandidates);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
