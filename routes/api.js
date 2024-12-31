var express = require('express');
var router = express.Router();
const authController = require('@r/controllers/api/authController');
const profileController = require('@r/controllers/api/profileController');
const apiValidators = require('@r/validators/api');
const middlewares = require('@r/routes/middlewares.js');

router.post('/login', apiValidators.login(), authController.login);
router.post('/register', apiValidators.register(), authController.register);
router.post('/forget-password', apiValidators.forgetPassword(), authController.forgetPassword);
router.post('/reset-password', apiValidators.resetPassword(), authController.resetPassword);
router.post('/verify-email', apiValidators.verifyEmail(), middlewares.authMiddleware, authController.verifyEmail);
router.post('/resend-verify-email', middlewares.authMiddleware, authController.resendVerifyEmailCode);
router.post('/logout', middlewares.authMiddleware, authController.logout);

router.get('/profile', middlewares.verifiedMiddleware, profileController.index);

module.exports = router;
