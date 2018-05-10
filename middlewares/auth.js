require('dotenv').config();
const jwt      = require('jsonwebtoken');
const secret   = process.env.SECRET_KEY;

module.exports = {
  isLogin: (req, res, next) => {
    jwt.verify(req.headers.token, `${secret}`, function(err, decoded) {
      if(decoded){
        req.user = decoded
        next();
      } else {
        res.status(403).json({
          message: "Invalid Token"
        })
      }
    })
  }
}