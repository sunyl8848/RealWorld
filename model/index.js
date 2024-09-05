const mongoose = require("mongoose");
const { dbUrl } = require("../config/config.default");
const usersSchema = require("./usersSchema");

main().catch((err) => console.log(`MongoDB 数据库连接失败:${err}`));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("MongoDB 数据库连接成功");
}

const usersModel = mongoose.model('User', usersSchema);

exports.usersModel = usersModel;