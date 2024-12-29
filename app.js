require('module-alias/register');
require('dotenv').config();
const express = require('express');
const setupRoutes = require('@r/config/routes');
const setupErrorHandling = require('@r/config/errors');
const setupMiddlwares = require('@r/config/middleware');

var app = express();

// configure app
setupMiddlwares(app);
setupRoutes(app);
setupErrorHandling(app);

// start the app
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
