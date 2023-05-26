const errorHandler = (err, req, res, next) => {
  console.log("from error handler", err.stack);
  res.status(500).send(err.message);
  next();
};

module.exports = errorHandler;
