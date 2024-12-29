const logger = require('@r/utils/logger');

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

  jsonSuccessResponse: (res, message = '', data = {}) => {
    res.json({ message, data });
    res.end();
  },

  jsonErrorResponse: (res, message = '', data = {}, status = 500) => {
    res.status(status);
    res.json({ message, data });
    res.end();
  },

  report: error => {
    logger.error(error.stack);
  },
};
