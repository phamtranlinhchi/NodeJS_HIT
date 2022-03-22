const Url = require('../models/urlModel');
const asyncHandle = require('../middlewares/asyncHandle');
const shortid = require('shortid');
const validUrl = require('valid-url');

// [POST] /urls/
const shortenUrl = asyncHandle(async (req, res, next) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    // create url code
    const urlCode = shortid.generate();

    // check long url
    if (validUrl.isUri(longUrl)) {
        let url = await Url.findOne({ longUrl });

        if (url) {
            res.json(url);
        } else {
            const shortUrl = baseUrl + '/' + urlCode;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date(),
            });

            await url.save();

            res.json(url);
        }
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
