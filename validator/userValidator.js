const validate = require("../middleware/validate");
const { body, header } = require("express-validator");
const { usersModel } = require("../model");
const md5 = require('../util/md5');


module.exports.userValidator = [
  validate([
    header("authorization").notEmpty().withMessage("authorization不能为空")
  ])
];

module.exports.usersValidator = [
  validate([
    body("user.username").notEmpty().withMessage("用户名不能为空"),
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("邮箱不能为空"),
  ]),
  validate([
    body("user.email").custom(async (email, { req }) => {
      const user = await usersModel.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已经存在");
      }
    })
  ]),
];

module.exports.loginValidator = [
    validate([
      body("user.password").notEmpty().withMessage("密码不能为空"),
      body("user.email").notEmpty().withMessage("邮箱不能为空"),
    ]),
    validate([
      body("user.email").custom(async (email, { req }) => {
        const user = await usersModel.findOne({ email }).select([
          "email",
          "password",
          "username"
        ]);
        if (!user) {
          return Promise.reject("用户不存在");
        }
        req.user = user;
      })
    ]),
    validate([body('user.password').custom(async (password, {req})=>{
        if(md5(password) !== req.user.password){
            return Promise.reject('密码不正确');
        }
    })])
  ];
