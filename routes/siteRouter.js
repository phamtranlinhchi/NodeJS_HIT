const express = require('express');
const siteController = require('../controllers/siteController');

const siteRouter = express.Router();

siteRouter.route('/').get(siteController.index);

module.exports = siteRouter;
