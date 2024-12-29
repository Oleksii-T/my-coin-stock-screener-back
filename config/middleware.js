const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const helpers = require('@r/helpers');

module.exports = app => {
  app.use(helmet());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('layout', 'layouts/admin');
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use((req, res, next) => {
    res.locals.helpers = helpers;
    next();
  });
};
