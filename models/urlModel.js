const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, require: true },
    urlCode: { type: String, unique: true },
    date: {
        type: String,
        default: Date.now,
    },
});

urlSchema.pre('save', async function (next) {
    let code = shortid.generate();
    while (await Url.find({ urlcode: code })) code = shortid.generate();
    this.urlCode = code;
    next();
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
