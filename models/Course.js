const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = require("../models/User");


let courseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    id: {
      type: Number,
    },
    description: {
      type: String,
    },
    major: {
      type: String,
    },
    semester: {
      type: Number,
    },
    grade: {
      type: String,
      default: "N/A"
    }

  },
  {
    collection: "courses",
  }
);

module.exports = mongoose.model("Course", courseSchema);
