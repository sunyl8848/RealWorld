const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const articleControl = require("../controller/articleControl");
const {
  createArticleValidator,
  getArticleValidator,
} = require("../validator/articleValidator");

// List Articles 获取文章列表
router.get("/", async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /");
  } catch (err) {
    next(err);
  }
});

// Feed Articles 获取用户关注的作者文章列表
router.get("/feed", async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /articles/feed");
  } catch (err) {
    next(err);
  }
});

// Get Article 获取文章
router.get("/:articleId", getArticleValidator, articleControl.getArticle);

// Create Article 创建文章
router.post("/", auth, createArticleValidator, articleControl.createArticle);

// Update Article 更新文章
router.put("/:articleId", async (req, res, next) => {
  try {
    // 处理请求
    res.send("put /articles/:slug");
  } catch (err) {
    next(err);
  }
});

// Delete Article 删除文章
router.delete("/:articleId", async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /articles/:slug");
  } catch (err) {
    next(err);
  }
});

// Add Comments to an Article 添加文章评论
router.post("/:slug/comments", async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /articles/:slug/comments");
  } catch (err) {
    next(err);
  }
});

// Get Comments from an Article 获取文章评论列表
router.get("/:slug/comments", async (req, res, next) => {
  try {
    // 处理请求
    res.send("get /articles/:slug/comments");
  } catch (err) {
    next(err);
  }
});

// Delete Comment 删除文章评论
router.delete("/:slug/comments/:id", async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /articles/:slug/comments/:id");
  } catch (err) {
    next(err);
  }
});

// Favorite Article
router.post("/:slug/favorite", async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /articles/:slug/favorite");
  } catch (err) {
    next(err);
  }
});

// Unfavorite Article
router.delete("/:slug/favorite", async (req, res, next) => {
  try {
    // 处理请求
    res.send("delete /articles/:slug/favorite");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
