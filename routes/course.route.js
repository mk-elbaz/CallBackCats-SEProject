let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
let studentSchema = require("../models/Student");

// Course Model
let courseSchema = require("../models/Course");

// CREATE course
router.route("/create-course").post((req, res, next) => {
  courseSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ courses
router.route("/").get((req, res) => {
  courseSchema
    .find(
      /*{name : 'CS'},*/ (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      }
    )
    .sort({ semester: 1 });
});

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
