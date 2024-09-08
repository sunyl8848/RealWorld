const { buildCheckFunction, body } = require("express-validator");
const { default: mongoose } = require("mongoose");

// can be reused by many routes
module.exports = (validations) => {
  return async (req, res, next) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    next();
  };
};

module.exports.isValidObject = (locations, field)=>{
  return buildCheckFunction(locations)(field).custom(async value=>{
    if (!mongoose.isValidObjectId(value)) {
      return Promise.reject("文章ID类型错误");
    }
  })
}
