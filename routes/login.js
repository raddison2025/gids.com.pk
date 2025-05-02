// routes/index.js
const express = require('express');
const router = express.Router();


// login route (3rd page)
router.get('/', (req, res) => {
  const data = req.query.xyz;

  if (data === undefined) {
    res.render('error', { message: 'Error: "xyz" query parameter is missing.' });
  } else {
    res.render('login', { data });
  }
  
});
module.exports = router;