
const express = require("express");

const coursesController = require('../controllers/coursesController');
const coursesRouter = express.Router();


coursesRouter.use(express.json());



// coursesRouter.get("/", coursesController.getAllCourses);

// coursesRouter.post("/", coursesController.createCourse);

coursesRouter
    .route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.createCourse);

coursesRouter
    .route('/:id')
    .get(coursesController.getCourse)
    .put(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

module.exports = coursesRouter;

