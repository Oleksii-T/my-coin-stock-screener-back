const logger = require('@r/utils/logger');
const User = require('@r/models/User.js');

module.exports.frontUrl = path => {
  const baseUrl = process.env.FRONT_URL;
  return `${baseUrl}/${path}`;
};

module.exports.url = path => {
  const baseUrl = process.env.APP_URL;
  return `${baseUrl}/${path}`;
};

module.exports.dd = (res, data) => {
  console.log(data);
  res.status(500).json(data);
  res.end();
};

module.exports.jsonSuccess = (res, message = '', data = {}) => {
  res.json({ message, data });
  res.end();
};

module.exports.jsonError = (res, message = '', data = {}, status = 500) => {
  res.status(status);

  if (status == 422 || !message) {
    message = 'Invalid data';
  }

  res.json({ message, data });
  res.end();
};

module.exports.report = error => {
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
};

module.exports.isAuth = req => {
  return !!req.session.user?.id;
};

module.exports.authUser = async req => {
  if (!req.session.user?.id) {
    return null;
  }

  const user = await User.findOne({ where: { id: req.session.user.id } });

  return user;
};

module.exports.generateRandomString = (length = 5, onlyUpper = false) => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if (!characters) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
