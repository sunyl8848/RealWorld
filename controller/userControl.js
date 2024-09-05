const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/config.default");
const { usersModel } = require("../model");
const { sign } = require('../util/jwt');


module.exports.usersControl = async (req, res, next) => {
  try {
    let user = new usersModel(req.body.user);
    await user.save();
    user = user.toJSON();
    
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.loginControl = async (req, res, next) => {
    try {
      let user = req.user.toJSON();
      const token =  await sign({userId: user._id.toString()}, jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      });
      user.token = token;
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  module.exports.userControl = async (req, res, next) => {
    try {
      let user = req.user.toJSON();
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };