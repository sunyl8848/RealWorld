const { default: mongoose } = require("mongoose");
const validate = require("../middleware/validate");
const { body, param } = require("express-validator");

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
