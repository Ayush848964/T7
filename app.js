const express = require('express');
const mongoose = require('mongoose');
const app = express();


const userRoute = require("./routes/routes");

app.use(express.json());

app.use("/", userRoute);

mongoose.connect('mongodb+srv://ayushawasthi:'+ encodeURIComponent('Fall@2019')+'@cluster0.hzdcmwz.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});


module.exports = app;