const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User.js');
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user',userRouter);
mongoose.connect('mongodb+srv://mkelbaz:nnkoko11@bazdb.0bthm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
console.log('successfully connected to database');
});


mongoose.set('useFindAndModify' , false);


app.listen(5000,()=>{
    console.log('express server started');
});