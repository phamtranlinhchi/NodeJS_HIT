const express = require('express');

const urlController = require('../controllers/urlController');
const authMiddleware = require('../middlewares/authMiddleware');

const urlRouter = express.Router();

urlRouter
    .route('/')
    .post(
        authMiddleware.protect,
        authMiddleware.admin,
        urlController.shortenUrl
    );

urlRouter.route('/:code').get(urlController.getUrl);

module.exports = urlRouter;
