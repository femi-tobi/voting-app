const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS staff (email TEXT PRIMARY KEY)");
  db.run("CREATE TABLE IF NOT EXISTS votes (email TEXT PRIMARY KEY, data TEXT)");

  const emails = ['tobs@example.com', 'fems@example.com', 'bola@example.com', 'ayo@example.com'];
  const stmt = db.prepare('INSERT OR IGNORE INTO staff(email) VALUES (?)');
  emails.forEach(email => stmt.run(email));
  stmt.finalize();
});

app.post('/api/vote', (req, res) => {
  const { email, votes } = req.body;
  if (!email || !votes) return res.status(400).json({ success: false, message: 'Email and votes are required.' });

  db.get('SELECT * FROM staff WHERE email = ?', [email], (err, staffRow) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error.' });
    if (!staffRow) return res.status(401).json({ success: false, message: 'Unauthorized email.' });

    db.get('SELECT * FROM votes WHERE email = ?', [email], (err, voteRow) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error.' });
      if (voteRow) return res.json({ success: false, message: 'You have already voted.' });

      db.run('INSERT INTO votes(email, data) VALUES (?, ?)', [email, JSON.stringify(votes)], err => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to save vote.' });
        return res.json({ success: true, message: 'Vote submitted successfully!' });
      });
    });
  });
});

app.get('/api/results', (req, res) => {
  db.all('SELECT data FROM votes', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch results.' });

    const results = {};
    rows.forEach(({ data }) => {
      const vote = JSON.parse(data);
      for (const [position, candidate] of Object.entries(vote)) {
        if (!results[position]) results[position] = {};
        results[position][candidate] = (results[position][candidate] || 0) + 1;
      }
    });

    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
