module.exports = app => {
  app.use('/', require('@r/routes/index'));
  app.use('/admin', require('@r/routes/admin'));
  app.use('/api', require('@r/routes/api'));
};
