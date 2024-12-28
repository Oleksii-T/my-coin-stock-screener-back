const { dd } = require("@r/helpers");
const { matchedData } = require("express-validator");

exports.login = (req, res) => {
  const data = matchedData(req);
  dd(res, { data });
};
