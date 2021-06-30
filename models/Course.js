const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
  name: {
    type: String
  },
  id: {
    type: Number
  },
  description: {
    type: String
  },
  major: {
      type: String
  },
  semester:{
      type: Number
  }
}, {
    collection: 'courses'
  })

module.exports = mongoose.model('Course', courseSchema)