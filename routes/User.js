const router = require("express").Router();
const User = require("../models/user.model");
const Major = require("../models/major.model");
const Semester = require("../models/semester.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("../util");

// register

router.post("/register", async (req, res) => {
  try {
    const { displayName, username, password, passwordVerify, role , major, semester} = req.body;
    console.log({ displayName, username, password, passwordVerify, role , major, semester})

    // validation
    if (!username || !role || !password || !passwordVerify)
      return res
        .status(400)
        .json({ msgError: "Please enter all required fields." });


    if (password !== passwordVerify)
      return res.status(400).json({
        msgError: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({
        msgError: "An account with this username already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    if(!displayName)
    {
        displayName = username;
    }
    majorId = undefined;
    if(major)
    {
        majorObj =  await Major.findOne({ major });
        majorId = majorObj._id;
    }
    semesterId = undefined;
    if(semester)
    {
        semesterObj =  await Semester.findOne({ semester });
        semesterId = semesterObj._id;
    }
    const newUser = new User({
      displayName,
      username,
      password:passwordHash,
      role,
      majorId,
      semesterId
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    // validation

    if (!username || !password)
      return res
        .status(400)
        .json({ msgError: "Please enter all required fields." });


    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ msgError: "Wrong username or password." });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({ msgError: "Wrong username or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        
      })
      .send()
      ;
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/changePassword", util.checkLogin, async (req, res) => {
    try {
        const {password, newPassword, newPasswordVerify} = req.body;
        if (!password || !newPassword || !newPasswordVerify)
            return res
             .status(400)
             .json({ msgError: "Please enter all required fields." });

        if (newPassword !== newPasswordVerify)
            return res.status(400).json({
              msgError: "Please enter the same password twice.",
            });
        
        const existingUser = await util.getTokenUser(req);
        if (!existingUser)
            return res.status(401).json({ msgError: "Wrong user data." });
        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordCorrect)
            return res.status(401).json({ msgError: "Wrong password." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate({_id: existingUser._id}, {password:passwordHash});
        
        // sign the token

        const token = jwt.sign(
            {
            user: existingUser._id,
            },
            process.env.JWT_SECRET
        );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
        })
        .send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

router.get('/authenticated',util.checkLogin,(req,res)=>{
  const {username,role} = req.user;
  res.status(200).json({isAuthenticated : true, user : {username,role}});
});


router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
    })
    .send();
});



module.exports = router;