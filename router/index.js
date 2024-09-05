const express = require("express");
const userRouter = require("./userRouter");
const rootRouter = express.Router();
const articleRouter = require('./articleRouter');
require("../model");

// user router
rootRouter.use(userRouter);

// article router
rootRouter.use('/articles', articleRouter);

module.exports = rootRouter;
