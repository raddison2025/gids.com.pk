// routes/index.js
const express = require('express');
const router = express.Router();

// Index route (first page)
router.get('/', (req, res) => {
  const xyz = req.query.xyz;

  if (!xyz) {
    return res.render('error', { message: 'Error: "xyz" query parameter is missing.' });
  }

  // Pass 'xyz' to the index view as 'data'
  res.render('index', { data: xyz });
});

module.exports = router;
