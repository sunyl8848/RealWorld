module.exports = () => {
  return (err, req, res, next) => {
    console.log("err:", err);
    res.status(401).end();
  };
};
