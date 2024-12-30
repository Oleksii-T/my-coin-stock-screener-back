const { authUser, jsonSuccess } = require('@r/utils/helpers');
const UserResource = require('@r/resources/UserResource');

exports.index = async (req, res) => {
  const user = await authUser(req);

  return jsonSuccess(res, '', {
    user: UserResource.single(user),
  });
};
