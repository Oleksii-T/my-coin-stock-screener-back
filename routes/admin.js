var express = require("express");
var router = express.Router();
const authController = require("../controllers/admin/authController");

router.get("/", (req, res) => {
  res.redirect("/admin/login");
});
router.get("/login", authController.loginForm);
router.post("/login", authController.login);

module.exports = router;
