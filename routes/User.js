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
      res.status(500).json({
        message: { msgBody: "Error has occccccccured", msgError: true },
      });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has ooooooccured", msgError: true },
          });
        else {
          res.status(201).json({
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

//60d8ee1c15c4d11d045db169

userRouter.put(
  "/changePass/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    console.log(req.headers.cookie.split(";")[1].split("=")[1]);
    const token = req.headers.cookie.split(";")[1].split("=")[1];
    if (!token) {
      return res.json(false);
    }
    data = JWT.verify(token, "NoobCoder");
    console.log("zzzzzzz" + data.user)
    userId = data.user;
    const existingUser = await User.find({ _id: userId });
    const id = userId;
    console.log("aaaaaaaaaa   " + existingUser);

    //Making a user object to parse to the update function
    let updatedUser = {};
    updatedUser.password = req.body.password;

    await User.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
      if (err) {
        console.log("aaa" + err);
      } else {
        console.log("mmm.." + updatedData);
        res.send();
        //res.redirect or res.send whatever you want to do
      }
    });
  }
);

/*
userRouter.route("/changePass/").put((req, res, next) => {
  console.log(req.params.id)
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
        
      } else {
        res.json(data);
        console.log("password updated successfully !");
      }
    }
  );
});
*/

/*
studentRouter.put('/', (req: Request<StudentInterface>, res: Response) => {
    if(req.body && req.body.dateOfBirth) {
        const dateMomentObject = moment(req.body.dateOfBirth, "DD/MM/YYYY"); 
        req.body.dateOfBirth = dateMomentObject.toISOString();
    }
    updateStudent(req, res);
});

*/

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = JWT.sign(
        {
          user: existingUser._id,
        },
        "NoobCoder"
      );
      //const token = signToken(_id);
      res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
      })
      .send();
     // res.cookie("access_token", token, { httpOnly: true, sameSite: true });
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
      res.status(403).json({
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
    const allSchedules = await ScheduleData.find({ faculty: "CS" });
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
