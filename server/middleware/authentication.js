const jwt = require("jsonwebtoken");

const verifyAuthCode = (authSmsCode, inputAuthCode) => {
  return authSmsCode === inputAuthCode;
};

const createToken = ({ mobile, authSmsCode }) => {
  return jwt.sign({ mobile, authSmsCode }, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
  });
};

module.exports = {
  // hashPassword,
  verifyAuthCode,
  createToken,
};
