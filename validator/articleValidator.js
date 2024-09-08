const { default: mongoose } = require("mongoose");
const validate = require("../middleware/validate");
const { body, param } = require("express-validator");
const { articleModel } = require("../model");

module.exports.createArticleValidator = [
  validate([
    body("article.title").notEmpty().withMessage("文章标题不能为空"),
    body("article.description").notEmpty().withMessage("文章描述不能为空"),
    body("article.body").notEmpty().withMessage("文章内容不能为空"),
  ]),
];

module.exports.getArticleValidator = [
  validate([
    param("articleId").custom(async (articleId) => {
      if (!mongoose.isValidObjectId(articleId)) {
        return Promise.reject("文章ID类型错误");
      }
    }),
  ]),
];

module.exports.updateArticleValidator = [
  validate(
    [validate.isValidObject(["params"], "articleId")],
  ),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await articleModel.findById(articleId);
    req.article = article;
    if (!article) {
      res.status(404).end();
    }
    next();
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      res.status(403).end();
    }
    next();
  }
];

// 删除文章
module.exports.deleteArticleValidator = module.exports.updateArticleValidator;