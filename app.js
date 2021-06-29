const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("giuDB database connection established successfully");
})

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const majorRouter = require('./routes/major');
app.use('/major', majorRouter);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});