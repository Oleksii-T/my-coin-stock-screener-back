const createError = require('http-errors');

module.exports = app => {
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // Error handler
  app.use((err, req, res, next) => {
    const isApiRequest = req.get('Accept') === 'application/json';

    if (isApiRequest) {
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: req.app.get('env') === 'development' ? err : {},
      });
    } else {
      res.status(err.status || 500);
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.locals.layout = 'layouts/landing';
      res.locals.title = 'Server Error';

      res.render('error');
    }
  });
};
