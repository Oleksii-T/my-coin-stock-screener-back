const { dd, jsonError, jsonSuccess, report } = require('@r/utils/helpers');
const { matchedData } = require('express-validator');
const User = require('@r/models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const data = matchedData(req);

  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    return jsonError(res, 'Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    return jsonError(res, 'Invalid email or password', 401);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return jsonSuccess(res, 'Logged in successfully', { token });
};

exports.register = async (req, res) => {
  const data = matchedData(req);
  var user;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });
  } catch (error) {
    report(error);

    return jsonError(res, 'Can not create user');
  }

  return jsonSuccess(res, 'Registered successfully!', { user });
};
