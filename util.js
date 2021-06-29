const User = require("./models/user.model");
const jwt = require("jsonwebtoken");


async function checkLogin(req, res, next){
    try {
      const token = req.headers.cookie.split("=")[1];
      if (!token) return res.json(false);
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
        return res.status(401).json({ errorMessage: "User not logged in." });
    }
  }

  async function authAdmin(req, res, next){
    try {
      const token = req.headers.cookie.split("=")[1];
      if (!token) return res.json(false);
      data = jwt.verify(token, process.env.JWT_SECRET);
      userId = data.user;
      const existingUser = await User.findOne({ _id:userId });
      if(existingUser.role != "ADMIN")
      {
        return res.status(401).json({ errorMessage: "Authentication failed" });
      }
      next();
    } catch (err) {
        return res.status(401).json({ errorMessage: "User not logged in." });
    }
  }

  async function getTokenUser(req)
  {
    const token = req.headers.cookie.split("=")[1];
      if (!token) return res.json(false);
      data = jwt.verify(token, process.env.JWT_SECRET);
      userId = data.user;
      const existingUser = await User.findOne({ _id:userId });
      return existingUser;
  }
 
 module.exports.checkLogin = checkLogin;  
 module.exports.authAdmin = authAdmin;  
 module.exports.getTokenUser = getTokenUser;  