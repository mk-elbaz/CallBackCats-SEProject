const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  rollno: {
    type: Number
  },
  tutNo:
  {
    type: Number
  },
  grade:{
    type: String,
    default:"N/A"
  },
  major:{
    type: String
  },
  courses: [Number],
}, {
    collection: 'students'
  })

module.exports = mongoose.model('Student', studentSchema)