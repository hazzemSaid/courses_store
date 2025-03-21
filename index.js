var morgan = require("morgan");
const {body,validationResult}= require("express-validator");
const express = require("express");
const mongoose = require('mongoose');
const Courses = require("./models/course.model");
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
const url = "mongodb+srv://hazemsaid:node_js123@cluster0.iolzy.mongodb.net/codezone?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(()=>{
   console.log("connected to the database");
}).catch((err)=>{
   console.log(err);
   return;
});


app.use(morgan("dev"));
//crud -> create  read update delet
const courses = require("./data/courses");
const get = require("./methoud/get/get");
const post = require("./methoud/post/post");
const put = require("./methoud/put/put");

app.use("/",get);
app.use("/",post);
app.use("/",put);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
