require('dotenv').config();
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
const url = process.env.DB_URL;
mongoose.connect(url).then(() => {
   console.log("connected to the database");
}).catch((err) => {
   console.log(err);
   return;
});

app.use(morgan("dev"));

const courserouter=require("./routes/courses_route");
app.use("/api/v1/courses",courserouter);
app.use("*",(req, res, next) => {
   res.status(404).json({
      status: "error",
      message: "page not found",
   });
})
app.listen(3000, function () {
   console.log("Server is running on port 3000");
});

