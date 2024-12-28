require("module-alias/register");
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const helpers = require("./helpers");
var app = express();

// add global helpers to ejs
app.use((req, res, next) => {
  res.locals.helpers = helpers;
  next();
});

// packages\extensions config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/admin");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes config
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const isApiRequest = req.get("Accept") === "application/json";

  if (isApiRequest) {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      error: req.app.get("env") === "development" ? err : {},
    });
  } else {
    res.status(err.status || 500);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.locals.layout = "layouts/landing";
    res.locals.title = "Server Error";

    res.render("error");
  }
});

// export app instance
module.exports = app;

// listem for incomming requests
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
