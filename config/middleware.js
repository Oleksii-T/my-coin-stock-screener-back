const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const helpers = require('@r/utils/helpers');
const session = require('express-session');
const cors = require('cors');

module.exports = app => {
  // app.use(helmet());
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('layout', 'layouts/admin');
  // app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.use((req, res, next) => {
    res.locals.helpers = helpers;
    next();
  });

  app.use(
    session({
      // store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false, // Avoid resaving unchanged sessions
      saveUninitialized: false, // Don't save empty sessions
      cookie: {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 1000 * 60 * 60,
      },
    })
  );

  app.use(
    cors({
      origin: process.env.FRONT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
};
