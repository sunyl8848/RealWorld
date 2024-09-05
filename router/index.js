const express = require("express");
const userRouter = require("./userRouter");
const rootRouter = express.Router();
require("../model");

// user router
rootRouter.use(userRouter);

module.exports = rootRouter;
