const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(userController.getAllUsersAndPosts)
    .post(userController.createUser);

userRouter
    .route('18-40')
    .get(authMiddleware.admin, userController.getUsersBetween18And40);

userRouter
    .route('name-start-with-h')
    .get(authMiddleware.admin, userController.getUsersNameStartWithH);

userRouter
    .route('/:id')
    .get(userController.getUserAndPosts)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = userRouter;
