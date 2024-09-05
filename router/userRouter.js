const express = require('express');
const { usersControl, loginControl, userControl } = require('../controller/userControl');
const { usersValidator, loginValidator, userValidator } = require('../validator/userValidator');
const userRouter = express.Router();
const auth = require('../middleware/auth');

userRouter.post('/users', usersValidator, usersControl);
userRouter.post('/users/login', loginValidator,  loginControl);
userRouter.get('/user', auth, userValidator, userControl);

// Update User 更新用户
userRouter.put("/user", async (req, res, next) => {
    try {
      // 处理请求
      res.send("put /user");
    } catch (err) {
      next(err);
    }
  });

module.exports = userRouter;