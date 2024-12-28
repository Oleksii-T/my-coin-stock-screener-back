const { body } = require("express-validator");

// Validation rules
const loginValidationRules = (req, res, next) => [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  loginValidationRules,
};
