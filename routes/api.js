var express = require("express");
var router = express.Router();
const authController = require("../controllers/api/authController");
const { loginValidationRules } = require("../validators/loginRules");
const { validate } = require("../validators/validate");

// POST login route for web
router.post("/login", loginValidationRules(), validate, authController.login);

module.exports = router;
