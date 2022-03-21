const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(authMiddleware.admin, userController.getAllUsersAndPosts);
userRouter
    .route('/:id')
    .get(userController.getUserAndPosts)
    .put(userController.updateUserById)
    .delete(authMiddleware.admin, userController.deleteUserById);

userRouter
    .route('18-40')
    .get(authMiddleware.admin, userController.getUsersBetween18And40);

userRouter
    .route('start-with-h')
    .get(authMiddleware.admin, userController.getUsersNameStartWithH);

module.exports = userRouter;
