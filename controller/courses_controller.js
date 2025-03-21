const {  validationResult } = require("express-validator");
const Courses = require("../models/course.model");

// ✅ Create a new course
const createNewCourse = async (req, res) => {
	try {
		// Validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Create and save course
		const newCourse = await Courses.create({ ...req.body });
		res.status(201).json(newCourse);
	} catch (error) {
		console.error("Error creating course:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// ✅ Get all courses
const getAllCourses = async (req, res) => {
	try {
		const allCourses = await Courses.find();
		res.json(allCourses);
	} catch (error) {
		res.status(500).json({ message: "Error fetching courses" });
	}
};

// ✅ Get a single course by ID
const getSingleCourse = async (req, res) => {
	try {
		const course = await Courses.findById(req.params.id);
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}
		res.json(course);
	} catch (error) {
		res.status(404).json({ error: "Invalid Course ID" });
	}
};

// ✅ Update a course
const updateCourse = async (req, res) => {
	try {
		const course = await Courses.findById(req.params.id);
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}

		// Update values
		course.title = req.body.title || course.title;
		course.price = req.body.price || course.price;

		// Save and return the updated course
		await course.save();
		res.json(course);
	} catch (error) {
		res.status(500).json({ message: "Error updating course" });
	}
};

module.exports = {
	createNewCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse
};
