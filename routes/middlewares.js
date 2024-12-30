const { jsonError } = require('@r/utils/helpers');

module.exports = {
  authMiddleware: (req, res, next) => {
    if (req.session.user?.id) {
      return next();
    }

    return jsonError(res, 'Unauthorized', {}, 401);
  },
};
