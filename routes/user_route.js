const express = require("express");
const Router = express.Router();
const usercontroller = require("../controller/user.controller");
Router.get("/", usercontroller.getalluser);

module.exports = Router;
