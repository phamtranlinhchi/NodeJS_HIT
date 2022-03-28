const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/login').post(authController.login);
authRouter.route('/forget-password').post(authController.forgetPassword);
authRouter
    .route('/change-password')
    .put(authController.changePassword)
    .get(authController.changePasswordSite);

module.exports = authRouter;
