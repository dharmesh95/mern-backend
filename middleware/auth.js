const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from the  header
  const token = req.header("x-auth-token");
  // check if token is there
  if (!token) {
    return res.status(400).json({ msg: "no token authorized denied" });
  }
  // verify
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;
    //console.log(req.user.id);
    next();
  } catch (err) {
    res.status(401).json({ mg: "Token invalid " });
  }
};
