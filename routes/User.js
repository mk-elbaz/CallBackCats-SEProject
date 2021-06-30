const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Applicant = require("../models/Applicant");
const ScheduleData = require("../models/schedule.js");
const util = require("../util.js");



router.post("/register", async (req, res) => {
  try {
    const { username, password, passwordVerify, role , major, semester} = req.body;

    // validation
    if (!username || !role || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });


    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this username already exists.",
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
        sameSite: "none"
        ,secure: true
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/enroll", (req, res) => {
  const { fullName, birthDate, email, grade, faculty, nationality } = req.body;
  Applicant.findOne({ email }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occccccccured", msgError: true },
      });
    if (user)
      res.status(400).json({
        message: { msgBody: "Email is already taken", msgError: true },
      });
    else {
      const newUser = new Applicant({
        fullName,
        birthDate,
        email,
        grade,
        faculty,
        nationality,
      });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has ooooooccured", msgError: true },
          });
        else {
          res.status(201).json({
            message: {
              msgBody: "Successfully Applied! Check your email regularly!",
              msgError: false,
            },
          });
        }
      });
    }
  });
});


// log in

router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    // validation

    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });


    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong username or password." });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong username or password." });

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
        sameSite: "none"
        ,secure: true
      })
      .send();
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
           .json({ errorMessage: "Please enter all required fields." });

      if (newPassword !== newPasswordVerify)
          return res.status(400).json({
          errorMessage: "Please enter the same password twice.",
          });
      
      const existingUser = req.user;
      const passwordCorrect = await bcrypt.compare(
          password,
          existingUser.password
      );
      if (!passwordCorrect)
          return res.status(401).json({ errorMessage: "Wrong password." });

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
        sameSite: "none"
        ,secure: true
      })
      .send();
  }
  catch (err) {
      console.error(err);
      res.status(500).send();
    }
});

router.get("/loggedIn", async (req, res) =>{
try{
  const token = req.cookies.token;
  if (!token) res.json("");
  data = jwt.verify(token, process.env.JWT_SECRET);
  userId = data.user;
  const existingUser = await User.findOne({ _id:userId });
  res.json(existingUser.role);
} catch (err) {
  res.json("");
}
});

router.get("/logout", (req, res) => {
res
  .cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none"
    ,secure: true
  })
  .send();
});



router.get("/viewSchedule", async (req, res) => {
  try {
    const allSchedules = await ScheduleData.find({ faculty: "CS" });
    res.status(200).json(allSchedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/createSchedule", async (req, res) => {
  const schedule = req.body;
  const newSchedule = new ScheduleData(schedule);

  try {
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = router;
