const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let coursegradeSchema = new Schema({
  cid: {
    type: Number
  },
  sid: {
    type: Number
  },
  grade: {
    type: String,
    default: "N/A",
  },
}, {
    collection: 'coursegrade'
  })

module.exports = mongoose.model('Coursegrade', coursegradeSchema)