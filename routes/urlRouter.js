const express = require('express');

const authController = require('../controllers/authController');
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middlewares/authMiddleware');

const urlRouter = express.Router();

urlRouter.route('/login').post(authController.login);

urlRouter.route('/').post(urlController.shortenUrl);

urlRouter.route('/:code').get(urlController.getUrl);

module.exports = urlRouter;
