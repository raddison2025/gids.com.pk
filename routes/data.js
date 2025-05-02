const express = require('express');
const router = express.Router();
const { db } = require('../db');

// Route to fetch and render users data
router.get('/', async (req, res) => {
  try {
    // Fetch users from the 'mytable'
    const [users] = await db.query('SELECT * FROM mytable');

    // Log the fetched data (for debugging)
    console.log('Fetched users:', users);

    // Render the table view, passing the users data
    res.render('table', { users });
  } catch (err) {
    console.error('Error in /data route:', err.message);  // Log the error message for debugging
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
