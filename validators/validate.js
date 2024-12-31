const { validationResult } = require('express-validator');
const { jsonError } = require('@r/utils/helpers');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsShort = {};
    errors.array().forEach(error => {
      errorsShort[error.path] = error.msg;
    });
    return jsonError(res, '', errorsShort, 422);
  }
  next();
};

module.exports = validate;
