const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// Serve form to add candidate
app.get('/add-candidate', (req, res) => {
  res.send(\`
<html>
<head>
  <title>Add New Candidate</title>
</head>
<body>
  <h1>Add a New Political Candidate</h1>
  <form action="/add-candidate" method="POST">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name" required><br>
    <label for="party">Party:</label><br>
    <input type="text" id="party" name="party" required><br>
    <label for="platform">Platform:</label><br>
    <input type="text" id="platform" name="platform" required><br>
    <label for="slogan">Slogan:</label><br>
    <input type="text" id="slogan" name="slogan" required><br><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>
  \`);
});

// Handle form submission and add to candidates.json
app.post('/add-candidate', (req, res) => {
  const { name, party, platform, slogan } = req.body;
  const newCandidate = {
    id: candidates.length + 1,
    name,
    party,
    platform,
    slogan
  };
  candidates.push(newCandidate);
  fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
  res.redirect('/candidates');
});

// Display all candidates in styled HTML
app.get('/candidates', (req, res) => {
  let candidatesHtml = candidates.map(candidate => \`
    <div class="candidate-box">
      <h2>\${candidate.name}</h2>
      <p><strong>Party:</strong> \${candidate.party}</p>
      <p><strong>Platform:</strong> \${candidate.platform}</p>
      <p><strong>Slogan:</strong> \${candidate.slogan}</p>
    </div>
  \`).join('');
  
  res.send(\`
<html>
<head>
  <title>Candidate List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .candidate-box {
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 10px 0;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .candidate-box h2 {
      margin: 0 0 10px;
      font-size: 24px;
    }
  </style>
</head>
<body>
  <h1>All Political Candidates</h1>
  \${candidatesHtml}
</body>
</html>
  \`);
});

app.listen(PORT, () => {
  console.log(\`Server is running at http://localhost:\${PORT}\`);
});
