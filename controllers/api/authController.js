const { dd, jsonErrorResponse, jsonSuccessResponse, report } = require('@r/utils/helpers');
const { matchedData } = require('express-validator');
const sequelize = require('@r/config/database');
// const User = require('@r/models/User.js');
const bcrypt = require('bcrypt');
const logger = require('@r/utils/logger');

exports.login = (req, res) => {
  const data = matchedData(req);
  dd(res, { data });
};

exports.register = async (req, res) => {
  const data = matchedData(req);
  logger.info(`start register endpoint`);

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.firstName,
      email: data.email,
      password: hashedPassword,
    });

    jsonSuccessResponse(res, 'User created successfully', { user });
  } catch (error) {
    report(error);
    jsonErrorResponse(res, 'Can not create user');
  }
};
