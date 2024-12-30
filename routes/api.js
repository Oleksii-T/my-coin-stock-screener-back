var express = require('express');
var router = express.Router();
const authController = require('@r/controllers/api/authController');
const profileController = require('@r/controllers/api/profileController');
const apiValidators = require('@r/validators/api');
const middlewares = require('@r/routes/middlewares.js');
const validate = require('@r/validators/validate');

// POST login route for web
router.post('/login', apiValidators.loginValidationRules(), validate, authController.login);
router.post('/register', apiValidators.registerValidationRules(), validate, authController.register);

router.get('/profile', middlewares.authMiddleware, profileController.index);

module.exports = router;
