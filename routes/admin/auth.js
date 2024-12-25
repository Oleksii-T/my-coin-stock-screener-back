var express = require('express');
var router = express.Router();

// POST login route for web
router.post('/login', function(req, res, next) {
  const { username, password } = req.body;

  // Add your web authentication logic here
  if (username === 'admin' && password === 'password') {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;