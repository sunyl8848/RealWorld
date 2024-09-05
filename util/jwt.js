const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/config.default");
const {promisify} =  require('util');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const decode = promisify(jwt.decode);

exports.sign = sign;
exports.verify = verify;
exports.decode = decode;