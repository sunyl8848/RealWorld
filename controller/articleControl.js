const { articleModel, usersModel } = require("../model");

const { buildCheckFunction } = require('express-validator');

// 创建文章
module.exports.createArticle = async (req, res, next) => {
  try {
    // 处理请求
    console.log("req.body.article:", req.body.article);
    let article = new articleModel(req.body.article);
    article.author = req.user._id;
    (await article.populate("author")).populated();
    await article.save();
    res.status(201).json({ article });
  } catch (err) {
    next(err);
  }
};

// 获取文章
module.exports.getArticle = async (req, res, next) => {
  try {
    // 处理请求
    let article = await articleModel.findById(req.params.articleId);
    await article.populate("author");
    if (!article) {
      return res.status(404).end();
    }
    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
};

// 获取筛选文章列表
module.exports.getArticleList = async (req, res, next) => {
  try {
    // 处理请求
    const { offset = 0, limit = 20, tag, author } = req.query;
    let filter = {};
    if (tag) {
      filter.tagList = tag;
    }

    if (author) {
      const user = await usersModel.findOne({ username: author });
      filter.author = user ? user._id : null;
    }

    let articles = await articleModel.find(filter).skip(+offset).limit(+limit).sort({createdAt:-1});
    let articlesCount = await articleModel.countDocuments();

    res.status(200).json({ articles, articlesCount });
  } catch (err) {
    next(err);
  }
};

//更新文章
module.exports.updateArticle = async (req, res, next) => {
  try {
    // 处理请求
    res.status(200).end()
    // let articles = await articleModel.find(filter).skip(+offset).limit(+limit).sort({createdAt:-1});
    // let articlesCount = await articleModel.countDocuments();
  } catch (err) {
    next(err);
  }
};
