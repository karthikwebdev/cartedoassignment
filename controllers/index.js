require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  let token = req.headers["x-auth-token"];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    if (_id) {
      req.user = {};
      req.user._id = _id;
      next();
    } else {
      return res.status(401).json({
        error: "No access",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Token expired, login again",
    });
  }
};
