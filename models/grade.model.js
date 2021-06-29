const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  value: {
    type: String,
    required: true,
  }, 
  student: {
    type: {type: mongoose.Types.ObjectId, ref: 'User'},
    required: true,
  },
  course: {
    type: {type: mongoose.Types.ObjectId, ref: 'Course'},
    required: true,
  }
}, {
  timestamps: true,
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;