const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ApplicantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Applicant", ApplicantSchema);
