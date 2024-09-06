const { articleModel } = require("../model");

module.exports.createArticle = async (req, res, next) => {
  try {
    // 处理请求
    let article = new articleModel(req.body.article);
    article.author = req.user._id;
    (await article.populate("author")).populated();
    await article.save();
    res.status(201).json({ article });
  } catch (err) {
    next(err);
  }
};

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

module.exports.getArticleList = async (req, res, next) => {
  try {
    // 处理请求
    let articles = await articleModel.find();
    let articlesCount = await articleModel.countDocuments();

    res.status(200).json({ articles, articlesCount });
  } catch (err) {
    next(err);
  }
};
