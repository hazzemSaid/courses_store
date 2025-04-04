const express = require("express");
const Router = express.Router();
const usercontroller = require("../controller/user.controller");
const { body } = require("express-validator");
const varifyToken = require("../middleware/verifyToken");
Router.get("/",varifyToken , usercontroller.getalluser);
Router.post(
	"/register",
	[
		body("email").isEmail().withMessage("Please enter a valid email"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
		body("name").notEmpty().withMessage("Name is required"),
		body("phone")
			.isMobilePhone()
			.withMessage("Please enter a valid phone number"),
	],
	usercontroller.register
);
Router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Please enter a valid email"),
		body("password").notEmpty().withMessage("Password is required"),
	],
	usercontroller.login
);
Router.delete("/:id", usercontroller.deleteuser);
module.exports = Router;
