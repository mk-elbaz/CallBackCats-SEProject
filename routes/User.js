const express = require("express");
const userRouter = express.Router();
const app = express();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Applicant = require("../models/Applicant");
const ScheduleData = require("../models/schedule.js");


const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({
          message: { msgBody: "Error has occccccccured", msgError: true },
        });
    if (user)
      res
        .status(400)
        .json({
          message: { msgBody: "Username is already taken", msgError: true },
        });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has ooooooccured", msgError: true },
            });
        else {
          res
            .status(201)
            .json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
        }
      });
    }
  });
});

userRouter.post("/enroll", (req, res) => {
  const { fullName, birthDate, email, grade, faculty, nationality } = req.body;
  Applicant.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({
          message: { msgBody: "Error has occccccccured", msgError: true },
        });
    if (user)
      res
        .status(400)
        .json({
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
          res
            .status(500)
            .json({
              message: { msgBody: "Error has ooooooccured", msgError: true },
            });
        else {
          res
            .status(201)
            .json({
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

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res
        .status(403)
        .json({
          message: { msgBody: "You're not an admin,go away", msgError: true },
        });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

userRouter.get("/viewSchedule", async (req, res) => {
  try {
    const allSchedules = await ScheduleData.find();
    res.status(200).json(allSchedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

userRouter.post("/createSchedule", async (req, res) => {
  const schedule = req.body;
  const newSchedule = new ScheduleData(schedule);

  try {
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});



module.exports = userRouter;
