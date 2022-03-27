const Url = require('../models/urlModel');
const asyncHandle = require('../middlewares/asyncHandle');
const validUrl = require('valid-url');
const ErrorResponse = require('../common/ErrorResponse');

// [POST] /urls/
const shortenUrl = asyncHandle(async (req, res, next) => {
    const { longUrl } = req.body;

    // check long url
    if (validUrl.isUri(longUrl)) {
        const url = await Url.create(req.body);
        res.status(201).json(url);
    } else {
        return next(new ErrorResponse('Invalid long url', 401));
    }
});

// [GET] /urls/:code
const getUrl = asyncHandle(async (req, res, next) => {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
        return res.status(200).json(url);
    } else {
        return next(new ErrorResponse('Not found url', 404));
    }
});

module.exports = {
    shortenUrl,
    getUrl,
};
