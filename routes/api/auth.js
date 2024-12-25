var express = require("express");
var router = express.Router();
const authController = require("../../controllers/api/authController");

// POST login route for web
router.post("/login", authController.login);

module.exports = router;
