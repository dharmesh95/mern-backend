const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from the  header
  const token = req.header("x-auth-token");
  next();
  // check if token is there
  if (!token) {
    return res.status(400).json({ msg: "no authorization token" });
  }
  // verify
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    next();
  } catch (err) {
    res.status(401).json({ mg: "Token invalid " });
  }
};
