// routes/index.js
const express = require('express');
const router = express.Router();


// load route (second page)
router.get('/', (req, res) => {
  const data = req.query.xyz;

  if (data === undefined) {
    res.render('error', { message: 'Error: "xyz" query parameter is missing.' });
  } else {
    res.render('load', { data });
  }
  
});
module.exports = router;