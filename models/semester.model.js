const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;