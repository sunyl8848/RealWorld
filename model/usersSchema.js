const mongoose = require("mongoose");
const md5 = require("../util/md5");
const baseModel = require("./baseModel");

const usersSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (val) => md5(val)
  }
});

module.exports = usersSchema;
