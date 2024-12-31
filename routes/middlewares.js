const { jsonError, authUser, isAuth } = require('@r/utils/helpers');
const logger = require('@r/utils/logger');

module.exports.authMiddleware = async (req, res, next) => {
  const user = await authUser(req);

  if (!user) {
    return jsonError(res, 'Unauthorized', {}, 401);
  }

  return next();
};

module.exports.verifiedMiddleware = async (req, res, next) => {
  const user = await authUser(req);

  if (!user) {
    return jsonError(res, 'Unauthorized', {}, 401);
  }

  if (!user.emailVerifiedAt) {
    return jsonError(res, 'Email verification is required to access this resource.', {}, 412);
  }

  return next();
};
