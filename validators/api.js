const { body } = require('express-validator');
const User = require('@r/models/User.js');

const isSame = (value, agains, msg) => {
  if (value !== agains) {
    throw new Error(msg);
  }

  return true;
};

const isUnique = async (value, field, model) => {
  const exists = await model.findOne({
    where: {
      [field]: value,
    },
  });

  if (exists) {
    throw new Error(`${field} must be unique`);
  }

  return true;
};

module.exports.login = () => [
  body('email').isEmail().withMessage('Enter a valid email').escape(),
  body('password').notEmpty().withMessage('Password is required').escape(),
];

module.exports.register = () => [
  body('firstName').notEmpty().withMessage('First Name is required').escape(),
  body('lastName').notEmpty().withMessage('Last Name is required').escape(),
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom((value, { req }) => isUnique(value, 'email', User))
    .escape(),
  body('password').notEmpty().withMessage('Password is required').escape(),
  body('password_confirmation')
    .notEmpty()
    .withMessage('Password Confirmation is required')
    .escape()
    .custom((value, { req }) => isSame(value, req.body.password, 'Password confirmation does not match password')),
];

module.exports.verifyEmail = () => [body('code').notEmpty().withMessage('Code is required')];
