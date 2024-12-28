var express = require("express");
var router = express.Router();
const landingController = require("../controllers/landing/landingController");

router.get("/", landingController.index);
router.get("/terms", landingController.terms);
router.get("/privacy", landingController.privacy);
router.get("/about-us", landingController.aboutUs);
router.get("/contact-us", landingController.contactUs);

module.exports = router;
