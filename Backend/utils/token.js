const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const accesToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return { accesToken, refreshToken };
};

module.exports = { generateToken };
