var express = require('express');
var router = express.Router();
const authController = require('../controllers/api/authController');
const profileController = require('../controllers/api/profileController');
const apiValidators = require('../validators/api');
const { validate } = require('../validators/validate');
var { expressjwt: jwt } = require('express-jwt');

// POST login route for web
router.post('/login', apiValidators.loginValidationRules(), validate, authController.login);
router.post('/register', apiValidators.registerValidationRules(), validate, authController.register);

router.get('/profile', jwt({ secret: 'FoAoin@14@41%1msoAim', algorithms: ['HS256'] }), profileController.index);

module.exports = router;
