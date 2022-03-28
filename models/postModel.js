const mongoose = require('mongoose');
const User = require('./userModel');

const postSchema = new mongoose.Schema(
    {
        title: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        body: String,
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
