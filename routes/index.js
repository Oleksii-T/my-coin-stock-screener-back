var express = require("express");
var router = express.Router();
const landingController = require("../controllers/landing/landingController");

router.get("/", landingController.landing);

module.exports = router;
