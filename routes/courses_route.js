const express = require("express");
const controller = require("../controller/courses_controller");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const allowedto = require("../middleware/allowedto");
const userRole = require("../utils/userRole");
router
	.post(
		"/",
		[body("title").isLength({ min: 3 }), body("price").isLength({ min: 3 })],
		controller.createNewCourse
	)
	.get("/", verifyToken, controller.getAllCourses);
router
	.get("/:id", controller.getSingleCourse)
	.put("/:id", controller.updateCourse)
	.delete("/:id",verifyToken,allowedto(userRole.ADMIN,userRole.MANGER), controller.deleteCourse);

module.exports = router;
