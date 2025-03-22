const { validationResult } = require("express-validator");
const Courses = require("../models/course.model");
const httpResponseText = require("../models/httpResponsetext");
// ✅ Create a new course
const createNewCourse = async (req, res) => {
	try {
		// Validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: httpResponseText.error, massage: { error: errors.array() } });
		}

		// Create and save course
		const newCourse = await Courses.create({ ...req.body });
		// res.status(201).json(newCourse);
		res.status(201).json({
			status: httpResponseText.Success,
			data: newCourse,
		})
	} catch (error) {
		console.error("Error creating course:", error);
		// res.status(500).json({ message: "Internal Server Error" });
		res.status(500).json({
			status: httpResponseText.Error,
			massage: error.massage,
		})
	}
};

// ✅ Get all courses
const getAllCourses = async (req, res) => {
	try {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const skip = (page - 1) * limit;


		const allCourses = await Courses.find({}, { "__v": false }).skip(skip).limit(limit);
		// res.json(allCourses);
		res.status(200).json({
			status: httpResponseText.Success,
			data: allCourses,
		})
	} catch (error) {
		// res.status(500).json({ message: "Error fetching courses" });
		res.status(500).json({
			status: httpResponseText.Error,
			massage: error.massage,
		})
	}
};

// ✅ Get a single course by ID
const getSingleCourse = async (req, res) => {
	try {
		const course = await Courses.findById(req.params.id, { "__v": false });
		if (!course) {
			return res.status(404).json({ stuts: httpResponseText.Fail, error: "Course not found" });
			// return res.status(404).json({ error: "Course not found" });
		}
		res.json(course);
	} catch (error) {
		res.status(500).json({ status: httpResponseText.Error, message: "Error fetching course" });
		// res.status(404).json({ error: "Invalid Course ID" });
	}
};

// ✅ Update a course
const updateCourse = async (req, res) => {
	try {
		const course = await Courses.findById(req.params.id, { "__v": false });
		if (!course) {
			// return res.status(404).json({ error: "Course not found" });
			return res.status(404).json({ status: httpResponseText.Fail, error: "Course not found" });
		}

		// Update values
		course.title = req.body.title || course.title;
		course.price = req.body.price || course.price;

		// Save and return the updated course
		await course.save({}, { "__v": false });
		// res.json(course);
		res.status(200).json({
			status: httpResponseText.Success,
			data: course,
		})
	} catch (error) {
		// res.status(500).json({ message: "Error updating course" });
		res.status(500).json({
			status: httpResponseText.Error,
			massage: error.massage,
		})
	}
};
const deleteCourse = (req, res, next) => {
	const id = req.params.id;
	Courses.findByIdAndDelete(id, { "__v": false }).then((data) => {
		// res.json(data);
		if (!data) {
			return res.status(404).json({ status: httpResponseText.Fail, error: "Course not found" });
		}
		res.status(200).json({
			status: httpResponseText.Success,
			data: data,
		})
	}).catch((err) => {
		res.status(404).json({
			status: httpResponseText.Error,
			massage: err.massage,
		})
		// res.json(err);
	})
}
module.exports = {
	createNewCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse,
	deleteCourse
};
