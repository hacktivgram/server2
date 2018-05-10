require('dotenv').config();
const jwt      = require('jsonwebtoken');
const secret   = process.env.SECRET_KEY;

module.exports = {
  isLogin: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, secret);
      req.user = decoded
      next();
    } catch(err) {
      console.log(err);
      res.status(403).json({
        message: "Invalid Token"
      });
    }
  }
};