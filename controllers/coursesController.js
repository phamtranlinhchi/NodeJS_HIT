const Course = require("../models/coursesModel");

const getAllCourses = async (req, res) => {
	const courses = await Course.find();
	res.json(courses);
};

const getCourse = async (req, res) => {
	let { id } = req.params;
	// let course = courses.find((course) => course.id == id);
	let course = await Course.findById(id);
	res.json(course);
};

const createCourse = async (req, res) => {
	const newCourse = await Course.create(req.body);
	// console.log(req.body);
	// let course = req.body;
	// courses.push(course);
	res.json(newCourse);
	// res.send("Successfully Create");
};

const updateCourse = async (req, res) => {
	let { id } = req.params;
	// let putID = (course) => course.id == id;
	// let index = courses.findIndex(putID);

	// if(index===-1)
	//     return res.send("Not found ID");

	// courses[index].name = req.body.name;
	// courses[index].leader = req.body.leader;
	// courses[index].year = req.body.year;
	// res.send("Successfully Update");
	const course = await Course.findByIdAndUpdate(id, req.body);
	res.json(course);
};

const deleteCourse = async (req, res) => {
	let { id } = req.params;
	// let deleteID = (course) => course.id == id;
	// let index = courses.findIndex(deleteID);

	// if(index===-1)
	//     return res.send("Not found ID");

	// courses.splice(index, 1);
	// res.send("Successfully Delete");
	const course = await Course.findByIdAndDelete(id);
	res.json(course);
};

module.exports = {
	getAllCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
};
