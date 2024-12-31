var express = require('express');
var router = express.Router();
const authController = require('@r/controllers/api/authController');
const profileController = require('@r/controllers/api/profileController');
const apiValidators = require('@r/validators/api');
const middlewares = require('@r/routes/middlewares.js');
const validate = require('@r/validators/validate');

router.post('/login', apiValidators.login(), validate, authController.login);
router.post('/register', apiValidators.register(), validate, authController.register);
router.post('/verify-email', apiValidators.verifyEmail(), middlewares.authMiddleware, authController.verifyEmail);
router.post('/resend-verify-email', middlewares.authMiddleware, authController.resendVerifyEmailCode);

router.get('/profile', middlewares.verifiedMiddleware, profileController.index);

module.exports = router;
