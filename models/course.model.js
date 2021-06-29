const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }, 
  major: {
    type: {type: mongoose.Types.ObjectId, ref: 'Major'},
    required: true,
  },
  semester: {
    type: {type: mongoose.Types.ObjectId, ref: 'Semester'},
    required: true,
  }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;