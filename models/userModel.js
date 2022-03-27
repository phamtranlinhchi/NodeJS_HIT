const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: [true, 'require username'],
    },
    password: {
        type: String,
        required: [true, 'require password'],
    },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
