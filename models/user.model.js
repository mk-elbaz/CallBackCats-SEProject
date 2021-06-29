const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  }, 
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true,
  }, 
  role:{
    type: String,
    enum: ['admin', 'student', 'ta'],
    required: true
  },
  major: {
    type: {type: mongoose.Types.ObjectId, ref: 'Major'}
  },
  semester: {
    type: {type: mongoose.Types.ObjectId, ref: 'Semester'}
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;