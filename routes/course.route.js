let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
let userSchema = require("../models/User");
const passport = require("passport");
const JWT = require("jsonwebtoken");

// Course Model
let courseSchema = require("../models/Course");

// CREATE course
router.route("/create-course").post((req, res, next) => {
  courseSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      userSchema.updateMany(
        { faculty: req.body.major, role: "student" },
        { $push: { courseGrade: { course: req.body.name, grade: "N/A" } } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
    }
  });
});

// READ courses
//router.route("/").get(

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (req.user.role === "ta") {
      courseSchema
        .find({ major: req.user.faculty }, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        })
        .sort({ semester: 1 });
    } else if (req.user.role === "student") {
      courseSchema
        .find({ major: req.user.faculty }, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        })
        .sort({ semester: 1 });
    } else {
      courseSchema
        .find((error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        })
        .sort({ semester: 1 });
    }
  }
);

router.get(
  "/viewCourseGrade/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log(req.user);
    userSchema.find({ _id: req.user._id }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
);

// Get Single course
router.route("/edit-course/:id").get((req, res, next) => {
  courseSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/view-course/:id").get((req, res, next) => {
  courseSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update course
router.route("/update-course/:id").put((req, res, next) => {
  courseSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("course updated successfully !");
      }
    }
  );
});

// Delete course
router.route("/delete-course/:id").delete((req, res, next) => {
  courseSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
