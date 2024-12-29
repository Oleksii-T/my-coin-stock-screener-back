const { body } = require('express-validator');
// const User = require('@r/models/User'); // Mongoose User model

const isSame = (value, agains, msg) => {
  if (value !== agains) {
    throw new Error(msg);
  }

  return true;
};

const isUnique = async (value, field, model) => {
  return true;

  const exists = await model.findOne({ [field]: value });

  if (exists) {
    throw new Error(`${field} must be unique`);
  }

  return true;
};

module.exports = {
  loginValidationRules: () => [
    body('email').isEmail().withMessage('Enter a valid email').escape(),
    body('password').notEmpty().withMessage('Password is required').escape(),
  ],

  registerValidationRules: () => [
    body('firstName').notEmpty().withMessage('First Name is required').escape(),
    body('lastName').notEmpty().withMessage('Last Name is required').escape(),
    body('email')
      .isEmail()
      .withMessage('Enter a valid email')
      .custom((value, { req }) => isUnique(value, 'email', 'users'))
      .escape(),
    body('password').notEmpty().withMessage('Password is required').escape(),
    body('password_confirmation')
      .notEmpty()
      .withMessage('Password Confirmation is required')
      .escape()
      .custom((value, { req }) => isSame(value, req.body.password, 'Password confirmation does not match password')),
  ],
};
