const log = (req, res, next) => {
  console.log(
    `New request to ${req.url} via ${
      req.method
    } on ${new Date().toLocaleDateString()}`
  );
  next();
};

module.exports = log;
