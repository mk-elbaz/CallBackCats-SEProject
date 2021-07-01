const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    first: String,
    second: String,
    third: String,
    fourth: String,
    day: String,
    faculty : String
    

});

module.exports = mongoose.model('schedule' , scheduleSchema);
