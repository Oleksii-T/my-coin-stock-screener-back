// controllers/authController.js

exports.login = (req, res) => {
    const { username, password } = req.body;
  
    // Add your web authentication logic here
    if (username === 'admin' && password === 'password') {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  };
  