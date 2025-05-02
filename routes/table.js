// routes/table.js
const express = require('express');
const router = express.Router();
const { db } = require('../db'); 



//Route to create the users table if it doesn't exist
router.get("/create", async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mytable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  try {
    await db.query(createTableQuery);
    console.log("✅ Table 'users' created or already exists.");
    res.send("✅ Table 'users' created or already exists.");
  } catch (err) {
    console.error("❌ Error creating or checking the table:", err);
    res.status(500).send("❌ Error creating or checking the table.");
  }
});
//

// Route to delete the USERS table
router.get('/delete', async (req, res) => {
  const query = 'DROP TABLE mytable';

  try {
    const [result] = await db.query(query);
    res.send('Table USERS deleted successfully');
  } catch (err) {
    console.error('Error deleting table:', err);
    res.status(500).send('Error deleting table');
  }
});

module.exports = router;
