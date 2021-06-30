const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User.js');
const courseRouter = require('./routes/course.route.js');
const studentRoute = require('./routes/student.route');
const cors = require('cors')
app.use(express.json());app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000/",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use('/students', studentRoute)
app.use('/courses', courseRouter)
app.use('/user',userRouter);
mongoose.connect('mongodb+srv://mkelbaz:nnkoko11@bazdb.0bthm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
console.log('successfully connected to database');
console.log("----------------------------------------------------------------------------------------------")
});

mongoose.set('useFindAndModify' , false);


app.listen(5000,()=>{
    console.log('express server started');
});