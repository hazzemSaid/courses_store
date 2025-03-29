const { validationResult } = require("express-validator");
const Courses = require("../models/course.model");
const httpResponseText = require("../models/httpResponsetext");
const asyncWrapper = require("../middleware/asyncwrapper");
// ✅ Create a new course
const Error_handler = require("../utils/error");
const createNewCourse = asyncWrapper(
	async (req, res,next) => {
		// Validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			
			return res.status(400).json({ status: httpResponseText.Fail, error: errors.array() });
		}

		// Create and save course
		const newCourse = await Courses.create({ ...req.body });
		// res.status(201).json(newCourse);
		return res.status(201).json({
			status: httpResponseText.Success,
			data: newCourse,
		})
}
);

// ✅ Get all courses
const getAllCourses = asyncWrapper(
	async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const skip = (page - 1) * limit;


		const allCourses = await Courses.find({}, { "__v": false }).skip(skip).limit(limit);
		// res.json(allCourses);
		res.status(200).json({
			status: httpResponseText.Success,
			data: allCourses,
		})
	});

// ✅ Get a single course by ID
const getSingleCourse = asyncWrapper(
	async (req, res, next) => {
		const course = await Courses.findById(req.params.id, { "__v": false });
		if (!course) {
			const err =Error_handler("Course not found");
			return next(err);
			// return res.status(404).json({ stuts: httpResponseText.Fail, error:error.massage });
			// return res.status(404).json({ error: "Course not found" });
		}
		res.json(course);

	});

// ✅ Update a course
const updateCourse = asyncWrapper(async (req, res) => {
	const course = await Courses.findById(req.params.id, { "__v": false });
	if (!course) {
		const err = Error_handler.createError("Course not found");
	return 	next(err);
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
	}
	)
});
const deleteCourse = asyncWrapper(
	(req, res, next) => {
		const id = req.params.id;
		Courses.findByIdAndDelete(id, { "__v": false }).then((data) => {
			// res.json(data);
			if (!data) {
				const err = Error_handler.createError("Course not found");
				return next(err);
			}
			res.status(200).json({
				status: httpResponseText.Success,
				data: data,
			})
		}).catch((e) => {
			const err = Error_handler.createError(e.massage);
			return next(err);
		})
	}
)
module.exports = {
	createNewCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse,
	deleteCourse
};
