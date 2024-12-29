var express = require('express');
var router = express.Router();
const authController = require('../controllers/api/authController');
const apiValidators = require('../validators/api');
const { validate } = require('../validators/validate');

// POST login route for web
router.post('/login', apiValidators.loginValidationRules(), validate, authController.login);
router.post('/register', apiValidators.registerValidationRules(), validate, authController.register);

module.exports = router;
