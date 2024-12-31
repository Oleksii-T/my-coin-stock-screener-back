const { dd, jsonError, jsonSuccess, report, generateRandomString, authUser } = require('@r/utils/helpers');
const { matchedData } = require('express-validator');
const User = require('@r/models/User.js');
const bcrypt = require('bcrypt');
const { sendMail } = require('@r/utils/mailer');
const redisClient = require('@r/utils/redis');

async function sendVerifyEmailCode(user) {
  const key = `verification_code:${user.id}`;
  const code = process.env.NODE_ENV == 'development' ? '000000' : generateRandomString(6);
  await redisClient.setEx(key, 60 * 10, code);

  await sendMail({
    to: user.email,
    subject: 'Verify Your Email',
    template: 'verifyEmail.ejs',
    data: { user, code },
  });
}

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

  if (!user.emailVerifiedAt) {
    await sendVerifyEmailCode(user);
  }

  req.session.user = { id: user.id };

  return jsonSuccess(res, 'Logged in successfully');
};

exports.verifyEmail = async (req, res) => {
  const data = matchedData(req);
  const user = await authUser(req);
  const key = `verification_code:${user.id}`;
  const storedCode = await redisClient.get(key);

  if (!storedCode || storedCode != data.code) {
    return jsonError(res, '', { code: 'Invalid code' }, 422);
  }

  user.emailVerifiedAt = new Date();
  await user.save();

  return jsonSuccess(res, 'Verified successfully');
};

exports.resendVerifyEmailCode = async (req, res) => {
  const user = await authUser(req);
  await sendVerifyEmailCode(user);

  return jsonSuccess(res, 'Code resended successfully');
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

  await sendVerifyEmailCode(user);

  req.session.user = { id: user.id };

  return jsonSuccess(res, 'Registered successfully!', { user });
};
