var morgan = require("morgan");
const controller = require("./controller/courses_controller.js");
const { body } = require("express-validator");
const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
const url = "mongodb+srv://hazemsaid:node_js123@cluster0.iolzy.mongodb.net/codezone?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(() => {
   console.log("connected to the database");
}).catch((err) => {
   console.log(err);
   return;
});

app.use(morgan("dev"));

app.post("/", [body("title").isLength({ min: 3 }), body("price").isLength({ min: 3 })], controller.createNewCourse)
app.get("/", controller.getAllCourses);
app.get('/:id', controller.getSingleCourse)
app.put("/:id", controller.updateCourse);

app.listen(3000, function () {
   console.log("Server is running on port 3000");
});

