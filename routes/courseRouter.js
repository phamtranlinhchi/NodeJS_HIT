const express = require("express");

const courseController = require("../controllers/courseController");
const courseRouter = express.Router();

courseRouter.use(express.json());

// coursesRouter.get("/", courseController.getAllCourses);

// coursesRouter.post("/", courseController.createCourse);

courseRouter
	.route("/")
	.get(courseController.getAllCourses)
	.post(courseController.createCourse);

courseRouter
	.route("/:id")
	.get(courseController.getCourse)
	.put(courseController.updateCourse)
	.delete(courseController.deleteCourse);

module.exports = courseRouter;
