const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    faculty : String,
    first1: String,
    second1: String,
    third1: String,
    fourth1: String,
    day1: String,

    first2: String,
    second2: String,
    third2: String,
    fourth2: String,
    day2: String,

    first3: String,
    second3: String,
    third3: String,
    fourth3: String,
    day3: String,

    first4: String,
    second4: String,
    third4: String,
    fourth4: String,
    day4: String,

    first5: String,
    second5: String,
    third5: String,
    fourth5: String,
    day5: String,



});

module.exports = mongoose.model('schedule' , scheduleSchema);