require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const cekToken = (req, res, next) => {
  const cekToken = req.headers.authorization;
  if (cekToken) {
    const token = cekToken.split(" ")[1];
    jsonwebtoken.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          timestamp: new Date().toLocaleTimeString(),
          message: "Token yang itu tidak valid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      status: 401,
      timestamp: new Date().toLocaleTimeString(),
      message: "Harus login dulu gan biar dapet token",
    });
  }
};

module.exports = cekToken;
