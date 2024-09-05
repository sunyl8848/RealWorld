const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.default");
const { usersModel } = require("../model");
const { verify } = require("../util/jwt");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    token = token ? token.split("Bearer ")[1] : null;

    if (!token) {
    return res.status(401).end();
    }
    try {
      let payload = await verify(token, jwtSecret);
      let user = await usersModel.findById(payload.userId);
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).end();
    }
  } catch (err) {
    return res.status(401).end();
  }
};
