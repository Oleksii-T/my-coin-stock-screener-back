const { dd } = require('@r/helpers');
const { matchedData } = require('express-validator');
const sequelize = require('@r/config/database');

exports.login = (req, res) => {
  const data = matchedData(req);
  dd(res, { data });
};

exports.register = async (req, res) => {
  const data = matchedData(req);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  dd(res, { data });
};
