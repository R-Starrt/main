const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

const VOTES_FILE = 'votes.json';

// Load votes from file or initialize
let votes = {};
if (fs.existsSync(VOTES_FILE)) {
  votes = JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'));
} else {
  votes = {
    Cilo: 0, Agung: 0, Jawir: 0, Ireng: 0,
    Budi: 0, Siti: 0, Rina: 0, Dika: 0,
    Rudi: 0, Tini: 0
  };
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2));
}

function saveVotes() {
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2));
}

app.post('/api/vote', (req, res) => {
  const { vote } = req.body;
  if (votes.hasOwnProperty(vote)) {
    votes[vote]++;
    saveVotes();
    res.json({ success: true, votes });
  } else {
    res.status(400).json({ success: false, message: 'Invalid vote' });
  }
});

app.get('/api/votes', (req, res) => {
  res.json(votes);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
