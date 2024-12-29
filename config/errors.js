const createError = require('http-errors');
const logger = require('@r/utils/logger');

module.exports = app => {
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // Error handler
  app.use((err, req, res, next) => {
    logger.error(err);
    const isApiRequest = req.get('Accept') === 'application/json';
    const isDev = req.app.get('env') === 'development';
    const errMessage = err.message || 'Internal Server Error';
    const errTrace = isDev ? err : {};
    res.status(err.status || 500);

    if (isApiRequest) {
      res.json({
        message: errMessage,
        error: errTrace,
      });
    } else {
      res.locals.message = errMessage;
      res.locals.error = errTrace;
      res.locals.title = errMessage;
      res.locals.layout = 'layouts/landing';

      res.render('error');
    }
  });
};
