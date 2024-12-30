const logger = require('@r/utils/logger');
const User = require('@r/models/User.js');

module.exports = {
  // Example helper to generate a URL with the base FRONT_URL
  url: path => {
    const baseUrl = process.env.FRONT_URL || 'http://localhost:3000';
    return `${baseUrl}/${path}`;
  },

  // Another example: format a date
  formatDate: date => {
    return new Date(date).toLocaleDateString();
  },

  // Yet another example: capitalize a string
  capitalize: str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  dd: (res, data) => {
    console.log(data);
    res.status(500).json(data);
    res.end();
  },

  jsonSuccess: (res, message = '', data = {}) => {
    res.json({ message, data });
    res.end();
  },

  jsonError: (res, message = '', data = {}, status = 500) => {
    res.status(status);
    res.json({ message, data });
    res.end();
  },

  report: error => {
    if (!error) {
      logger.error('Unknown error occurred.');
      return;
    }

    if (error.name && error.name.startsWith('Sequelize')) {
      const space = '    ';
      const stack = error.stack.replace('Error', '');
      const errors = JSON.stringify(error.errors, null, 4).slice(1, -1).trim().replace(`\r\n`, `\r\n${space}`);
      const original = JSON.stringify(error.original, null, 4).slice(1, -1).trim().replace(`\r\n`, `\r\n${space}`);

      logger.error(
        `${error.name}: ${error.message}\r\n` +
          `${space}Errors:\r\n` +
          `${space}${errors}\r\n` +
          `${space}Original:\r\n` +
          `${space}${original}\r\n` +
          `${space}Trace:${stack}`
      );
      return;
    }

    if (!error.stack) {
      logger.error(JSON.stringify(error));
      return;
    }

    logger.error(error.stack);
  },

  authUser: async req => {
    if (!req.auth) {
      throw new Error('No authenticated user found');
    }

    return await User.findOne({ where: { id: req.auth.id } });
  },
};
