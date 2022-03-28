const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const Post = require('./postModel');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    username: {
        type: String,
        required: [true, 'Require username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Require password'],
    },
    email: {
        type: String,
        required: [true, 'Require email'],
        unique: true,
        validate: [validator.isEmail, 'Invalid email'],
    },
    reset_password_token: String,
    reset_password_token_expired: Date,
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

userSchema.methods.createResetPasswordToken = async function () {
    const token = await crypto.randomBytes(15).toString('hex');

    this.reset_password_token = await crypto
        .createHash('sha256', process.env.RESET_TOKEN_PRIVATE_MESSAGE)
        .update(token)
        .digest('hex');
    this.reset_password_token_expired =
        Date.now() + process.env.RESET_TOKEN_EXPIRE * 60 * 1000;
    await this.save();
};
const User = mongoose.model('User', userSchema);

module.exports = User;
