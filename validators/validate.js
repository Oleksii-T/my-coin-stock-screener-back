const { validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Invalid data',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;
