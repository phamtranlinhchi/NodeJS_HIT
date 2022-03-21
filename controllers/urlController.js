const Url = require('../models/urlModel');
const asyncHandle = require('../middlewares/asyncHandle');
const shortid = require('shortid');
const validUrl = require('valid-url');

// [POST] /shorten
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

            url.save();

            res.json(url);
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});

// [GET] /:code
const directToLongUrl = asyncHandle(async (req, res, next) => {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
        return res.redirect(url.longUrl);
    } else {
        return res.status(404).json('Not found url');
    }
});

module.exports = {
    shortenUrl,
    directToLongUrl,
};
