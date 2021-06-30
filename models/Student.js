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
  major:{
    type: String
  },
  grade :{
    type : String,
    default : 'N/A'
  }
}, {
    collection: 'students'
  })

module.exports = mongoose.model('Student', studentSchema)