const express = require("express");
const router = express.Router();

// Get Profile 获取用户资料
router.get("/:username", async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /profile/:username");
  } catch (err) {
    next(err);
  }
});

// Follow user 关注用户
router.post("/:username/follow", async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /profile/:username/follow");
  } catch (err) {
    next(err);
  }
});

// Unfollow user 取消关注用户
router.delete("/:username/follow", async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /profile/:username/follow");
  } catch (err) {
    next(err);
  }
});

module.exports = router;