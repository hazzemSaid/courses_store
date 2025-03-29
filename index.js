var bodyParser = require('body-parser')
var morgan = require("morgan");

const cors= require("cors");
const controller = require("./controller/courses_controller.js");
const { body } = require("express-validator");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const url = process.env.DB_URL;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
mongoose.connect(url).then(() => {
   console.log("connected to the database");
}).catch((err) => {
   console.log(err);
   return;
});

app.use(morgan("dev"));

const courserouter=require("./routes/courses_route");
app.use("/api/v1/courses",courserouter);

//global middleware for not found routes
app.use("*",(req, res, next) => {
   res.status(404).json({
      status: "error",
      message: "page not found",
   });
})

//global middleware for error handling
app.use((err, req, res, next) => {
     res.status(403).json({
      status: "error",
     error :err.message
   });

})

app.listen(process.env.PORT||3000, function () {
   console.log("Server is ru nning on port", `${process.env.PORT}`);
});

