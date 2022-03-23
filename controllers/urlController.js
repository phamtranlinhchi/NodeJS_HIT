const Url = require('../models/urlModel');
const asyncHandle = require('../middlewares/asyncHandle');
const validUrl = require('valid-url');

// [POST] /urls/
const shortenUrl = asyncHandle(async (req, res, next) => {
    const { longUrl } = req.body;

    // check long url
    if (validUrl.isUri(longUrl)) {
        const url = await Url.create(longUrl);
        res.json(url);
    } else {
        res.status(401).json('Invalid long url');
    }
});

// [GET] /urls/:code
const getUrl = asyncHandle(async (req, res, next) => {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
        return res.json(url);
    } else {
        return res.status(404).json('Not found url');
    }
});

module.exports = {
    shortenUrl,
    getUrl,
};
