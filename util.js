const User = require("./models/User");
const jwt = require("jsonwebtoken");


async function checkLogin(req, res, next){
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401);
      data = jwt.verify(token, process.env.JWT_SECRET);
      userId = data.user;
      const existingUser = await User.findOne({ _id:userId });
      req.user = existingUser;
      next();
    } catch (err) {
        return res.status(401).json({ errorMessage: "User data is invalid." });
    }
  }

  async function authAdmin(req, res, next){
    try {
      if(req.user.role != "ADMIN")
      {
        return res.status(401).json({ errorMessage: "Authentication failed" });
      }
      next();
    } catch (err) {
        return res.status(401).json({ errorMessage: "User not logged in." });
    }
  }

 
 
 module.exports.checkLogin = checkLogin;  
 module.exports.authAdmin = authAdmin;  