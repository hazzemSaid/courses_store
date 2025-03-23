const express = require("express");
const controller = require("../controller/courses_controller");
const { body } = require("express-validator");
const router = express.Router();
router.post("/", [body("title").isLength({ min: 3 }), body("price").isLength({ min: 3 })], controller.createNewCourse)
router.get("/", controller.getAllCourses);
router.get('/:id', controller.getSingleCourse)
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

module.exports = router;